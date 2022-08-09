<?php

if( !class_exists('AvApiProduct') ) {
    class AvApiProduct {
        function __construct() {
            // init rest-api
            add_action( 'rest_api_init', function () {
                register_rest_route( 'an-vat/v1', '/product', array(
                    'methods' => 'GET',
                    'callback' => array($this, "get_product")
                ) );
            });
            
            add_action('wp_ajax_insert_multiple_products_to_cart', array( $this, 'insert_multiple_products_to_cart' ));
            add_action('wp_ajax_nopriv_insert_multiple_products_to_cart', array( $this, 'insert_multiple_products_to_cart' ));
            
            // get cart content
            add_action('wp_ajax_get_cart', array( $this, 'get_cart' ));
            add_action('wp_ajax_nopriv_get_cart', array( $this, 'get_cart' ));
        }
        
        function get_product( $request ) {
            $params = $request->get_params();
            $slug = $params['slug'];
            $id = $params['p-id'];
            
            $product = false;
            
            if( isset($id) ) {
                $product = wc_get_product( $id );
                if( $product && $product->get_status() == 'publish' ) {
                    $pd['id'] = $product->get_id();
                    $pd['type'] = $product->get_type();
                    $pd['name'] = $product->get_name();

                    $image = wp_get_attachment_image_src( get_post_thumbnail_id( $product->get_id() ), 'single-post-thumbnail' );
                    $pd['image'] = $image[0];

                    $attachment_ids = $product->get_gallery_image_ids();
                    $galery = [];
                    foreach( $attachment_ids as $attachment_id ) 
                    {
                        $galery[] = wp_get_attachment_url( $attachment_id );
                    }
                    $pd['galery'] = $galery;

                    $pd['created_at'] = $product->get_date_created() ? $product->get_date_created() : $product->get_date_modified();
                    $pd['link'] = get_permalink( $product->get_id() );
                    $pd['regular_price'] = $product->get_regular_price();
                    $pd['sale_price'] = $product->get_sale_price();

                    $pd['description'] = $product->get_description();
                    $pd['short_description'] = $product->get_short_description();

                    // meta
                    $pd['dat_hang_truoc'] = get_field('dat_hang_truoc', $product->get_id());
                    $pd['order_note'] = get_field('order_note', $product->get_id());
                    $pd['anh_tu_khach_hang'] = get_field('anh_tu_khach_hang', $product->get_id());
                    $pd['chien_dich_giam_gia'] = get_field('chien_dich_giam_gia', $product->get_id());
                    
                    wp_send_json_success($pd);
                }
            }
            wp_send_json_error([
                'message' => "Tham số không phù hợp"
            ]);
            die;
        }
        
        function get_cart() {
            $this->get_refreshed_fragments();
        }
        
        function insert_multiple_products_to_cart() {
            try {
                $product_data_add_to_cart = explode( ',', $_REQUEST['product_data_add_to_cart'] );
                foreach ( $product_data_add_to_cart as $product_data ) {
        
                    // control product quantity
                    $data = explode('_', $product_data);
                    $product_id = $data[0];
                    $_quantity = count($data) === 2 ? $data[1] : 1;
                    $product_id        = apply_filters( 'woocommerce_add_to_cart_product_id', absint( $product_id ) );
                    $was_added_to_cart = false;
                    $adding_to_cart    = wc_get_product( $product_id );
                    
                    if ( ! $adding_to_cart ) {
                        continue;
                    }
                
                    $add_to_cart_handler = apply_filters( 'woocommerce_add_to_cart_handler', $adding_to_cart->get_type(), $adding_to_cart );
        
                    // For now, quantity applies to all products.. This could be changed easily enough, but I didn't need this feature.
                    $quantity          = apply_filters( 'woocommerce_stock_amount', $_quantity );
                    $passed_validation = apply_filters( 'woocommerce_add_to_cart_validation', true, $product_id, $quantity );
                    
                    if ( $passed_validation ) {
                        $was_added_to_cart = false;
                        if ( 'variable' === $add_to_cart_handler || 'variation' === $add_to_cart_handler ) {
                            if ( $adding_to_cart->is_type( 'variation' ) ) {
                                $variation_id   = $product_id;
                                $product_id     = $adding_to_cart->get_parent_id();
                            } else {
                                $adding_to_cart = wc_get_product( $adding_to_cart->get_visible_children()[0] );
                                $variation_id = $adding_to_cart->get_id();
                            }
                            $was_added_to_cart = WC()->cart->add_to_cart( $product_id, $quantity, $variation_id, $adding_to_cart->get_variation_attributes() );
                        } else {
                           $was_added_to_cart =  WC()->cart->add_to_cart( $product_id, $quantity );
                        }
                    }
                }
                
    
                $this->get_refreshed_fragments();
            } catch(Exception $e) {
                wp_send_json_error(
                    array(
                        "msg" => __('Không thể thêm sản phẩm. Vui lòng thử lại.', TEXT_DOMAIN)
                    )
                );
                
            }
            die;
        }
        
        function get_refreshed_fragments() {
            $data = array(
                'total' => WC()->cart->get_cart_contents_count(),
                'cart_hash' => WC()->cart->get_cart_hash(),
            );

            wp_send_json_success( $data );
        }
    }
    
    new AvApiProduct();
}