<?php

if( !class_exists('AvApiCart') ) {
    class AvApiCart {
        function __construct() {
            // get cart content
            add_action('wp_ajax_get_cart_content', array( $this, 'get_cart_content' ));
            add_action('wp_ajax_nopriv_get_cart_content', array( $this, 'get_cart_content' ));
            
            // get cart content
            add_action('wp_ajax_update_cart_item', array( $this, 'update_cart_item' ));
            add_action('wp_ajax_nopriv_update_cart_item', array( $this, 'update_cart_item' ));
            
            // del cart item
            add_action('wp_ajax_delete_cart_item', array( $this, 'delete_cart_item' ));
            add_action('wp_ajax_nopriv_delete_cart_item', array( $this, 'delete_cart_item' ));
        }
        
        function get_cart_content() {
            $resuls = [];
            
            foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
				$_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
				$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

				if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
					$product_permalink = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
                    $thumbnail = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image(), $cart_item, $cart_item_key );
                    $product_price = WC()->cart->get_product_price( $_product );
                    $quantity = $cart_item['quantity'];
                    $name = $_product->get_name();
                    $min_value = 1;
                    $max_value = $_product->get_max_purchase_quantity();
                    
                    $campaign =  get_field('chien_dich_giam_gia', $product_id);
                    if( !empty($campaign) ) {
                        $campaign = explode(',', $campaign);
                        $index = 0;
                        $arrayNums = [];
                        for($index = 0; $index < count($campaign); $index++) {
                            $arrayNums[$index] = explode(':', $campaign[$index])[0];
                        }
                        
                        $discount = 0;
                        for($index = 0; $index < count($campaign); $index++) {
                            if( $index == count($campaign)-1 && $quantity >= $arrayNums[$index]) {
                                $discount = intval(explode(':', $campaign[$index])[1]);
                            } else {
                                if( $quantity >= $arrayNums[$index] && $quantity < $arrayNums[$index+1] ) {
                                    $discount = intval(explode(':', $campaign[$index])[1]);
                                }
                            }
                        }
                    }
                    
                    
                    $resuls[] = [
                        "id"                        => $product_id,
                        "product_permalink"         => $product_permalink,
                        "thumbnail"                 => $thumbnail,
                        "regular_price"             => $_product->get_regular_price(),
                        "sale_price"                => $_product->get_sale_price(),
                        "product_price"             => $product_price,
                        "quantity"                  => $quantity,
                        "name"                      => $name,
                        "min_value"                 => $min_value,
                        "max_value"                 => $max_value,
                        "discount"                  => $discount
                    ];
                    $discount = 0;
                }
            }
            wp_send_json_success([
                "cart"  => $resuls,
                "fragment" => array(
                    'total' => WC()->cart->get_cart_contents_count(),
                    'cart_hash' => WC()->cart->get_cart_hash(),
                )
            ]);
        }
        
        function delete_cart_item() {
            $p_id = $_POST['p-id'];
            foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
                if( $cart_item['product_id'] == $p_id ) {
                    WC()->cart->remove_cart_item($cart_item_key);
                }
            }
            $this->get_cart_content();
        }
        
        function update_cart_item() {
            $p_id = $_POST['p-id'];
            $quantity = explode('_', $p_id)[1];
            $p_id = explode('_', $p_id)[0];
            if( empty($quantity) || intval($quantity) < 1 ) {
                $quantity = 1;
            } else {
                $quantity = intval($quantity);
            }
            foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
                if( $cart_item['product_id'] == $p_id ) {
                    WC()->cart->set_quantity($cart_item_key, $quantity);
                }
            }
            $this->get_cart_content();
        }
    }
    
    new AvApiCart();
}