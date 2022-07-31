<?php

if( !class_exists('AvApiCategory') ) {
    class AvApiCategory {
        function __construct() {
            // init rest-api
            add_action( 'rest_api_init', function () {
                register_rest_route( 'an-vat/v1', '/archive', array(
                    'methods' => 'GET',
                    'callback' => array($this, "get_products_in_archive")
                ) );
            
                register_rest_route( 'an-vat/v1', '/shop-archive', array(
                    'methods' => 'GET',
                    'callback' => array($this, "get_products_in_archive_shop")
                ) );
            
                // register_rest_route( 'an-vat/v1', '/shop-archive-attributes', array(
                //     'methods' => 'GET',
                //     'callback' => 'get_attribute_in_archive_shop',
                // ) );
            });
        }
        
        function get_products_in_archive( $request ) {
            $params = $request->get_params();
    
            $cat_id = !empty( $params['cat_id'] ) ? $params['cat_id'] : -1;
            $posts_per_page = 24;
            $paged = !empty( $params['page'] ) ? $params['page'] : 1;
            $orderby = !empty( $params['orderby'] ) ? $params['orderby'] : 'date';
            $order = !empty( $params['order'] ) ? $params['order'] : 'DESC';
    
            if( $cat_id == -1 ) {
                wp_send_json_error([
                    'message' => "Tham số không phù hợp"
                ]);
                die;
            }
    
    
            $args = array(
                'post_type'             => 'product',
                'post_status'           => 'publish',
                // 'ignore_sticky_posts'   => 1,
                'posts_per_page'        => $posts_per_page,
                'paged'                 => $paged,
                'meta_query'            => array(
                    array('relation' => 'AND'),
                    array(
                        'key'           => '_visibility',
                        'value'         => array('catalog', 'visible'),
                        'compare'       => 'IN'
                    )
                )
            );
            if( $orderby == 'date' || $orderby == 'popularity' ) {
                $args['orderby'] = $orderby;
                if( $orderby == 'date' ) {
                    $args['order'] = $order;
                }
            } else {
                $args['orderby'] = 'meta_value_num';
                $args['meta_key'] = '_' . $orderby;
                $args['order'] = $order;
            }
            
            if( $cat_id != -1 ) {
                $args['tax_query'][] = array('relation' => 'AND');
                $args['tax_query'][] = array(
                    'taxonomy'      => 'product_cat',
                    'field'         => 'term_id', //This is optional, as it defaults to 'term_id'
                    'terms'         => $cat_id,
                    'operator'      => 'IN' // Possible values are 'IN', 'NOT IN', 'AND'.
                );
            }
            $products = wc_get_products($args);
            
            $productRS = [];
            foreach( $products as $product ) {
                $pd['id'] = $product->get_id();
                $pd['title'] = $product->get_name();
                $image = wp_get_attachment_image_src( get_post_thumbnail_id( $product->get_id() ), 'single-post-thumbnail' );
                $pd['image_url'] = $image[0];
                $pd['created_at'] = $product->get_date_created() ? $product->get_date_created() : $product->get_date_modified();
                $pd['url'] = "/san-pham/" . $product->get_slug();
                $pd['regular_price'] = $product->get_regular_price();
                $pd['sale_price'] = $product->get_sale_price();
                $pd['payload'] = [
                    "page"	=> 'single-product',
                    "title"	=> $product->get_name() . ' - ' . get_bloginfo('name'),
                    "product_id"	=> $product->get_id()
                ];
                $productRS[] = $pd;
            }
            wp_reset_query();
    
            // $category = get_term( $cat_id );
            // get all attributes
            // vì attributes đã được set trong danh mục nên sẽ lấy từ đó ra và valid
            $result = [
                "products" => $productRS,
                // "thuonghieu" => get_attributes_by_cats( [$category->slug], 'pa_thuong-hieu' ),
                // "attributes" => get_attributes_by_termid( $cat_id )
            ];
            
            wp_send_json_success( $result );
            die;
        }
        
        function get_products_in_archive_shop( $request ) {
            $params = $request->get_params();
            
            $posts_per_page = 24;
            $paged = !empty( $params['page'] ) ? $params['page'] : 1;
            $orderby = !empty( $params['orderby'] ) ? $params['orderby'] : 'date';
            $order = !empty( $params['order'] ) ? $params['order'] : 'DESC';
    
            $args = array(
                'post_type'             => 'product',
                'post_status'           => 'publish',
                // 'ignore_sticky_posts'   => 1,
                'posts_per_page'        => $posts_per_page,
                'paged'                 => $paged,
                'meta_query'            => array(
                    array('relation' => 'AND'),
                    array(
                        'key'           => '_visibility',
                        'value'         => array('catalog', 'visible'),
                        'compare'       => 'IN'
                    )
                )
            );
            if( $orderby == 'date' || $orderby == 'popularity' ) {
                $args['orderby'] = $orderby;
                if( $orderby == 'date' ) {
                    $args['order'] = $order;
                }
            } else {
                $args['orderby'] = 'meta_value_num';
                $args['meta_key'] = '_' . $orderby;
                $args['order'] = $order;
            }
            
            
            $products = wc_get_products($args);
            
            $productRS = [];
            foreach( $products as $product ) {
                $pd['id'] = $product->get_id();
                $pd['title'] = $product->get_name();
                $image = wp_get_attachment_image_src( get_post_thumbnail_id( $product->get_id() ), 'single-post-thumbnail' );
                $pd['image_url'] = $image[0];
                $pd['created_at'] = $product->get_date_created() ? $product->get_date_created() : $product->get_date_modified();
                $pd['url'] = "/san-pham/" . $product->get_slug();
                $pd['regular_price'] = $product->get_regular_price();
                $pd['sale_price'] = $product->get_sale_price();
                $pd['payload'] = [
                    "page"	=> 'single-product',
                    "title"	=> $product->get_name() . ' - ' . get_bloginfo('name'),
                    "product_id"	=> $product->get_id()
                ];
                $productRS[] = $pd;
            }
            wp_reset_query();
    
            // $category = get_term( $cat_id );
            // get all attributes
            // vì attributes đã được set trong danh mục nên sẽ lấy từ đó ra và valid
            $result = [
                "products" => $productRS,
                // "thuonghieu" => [],
                // "attributes" => get_attributes_by_termid( $cat_id )
            ];
            wp_send_json_success( $result );
            die;
        }
    }
    
    new AvApiCategory();
}