<?php
// get home cache data
add_action('admin_bar_menu', function($wp_admin_bar) {
    $args = array(
        'id' => 'create_home_cache',
        'title' => 'Create home cache',
        'href' => '#',
    );
    $wp_admin_bar->add_node($args);
}, 999);

add_action('admin_footer', function() { ?>
   <script>
    let woos_data_clean = {
      "action": "create_new_home_cache"
    };
    jQuery('body').on('click', '#wp-admin-bar-create_home_cache a', function() {
        jQuery("#wp-admin-bar-create_home_cache a").text("Starting...");
        jQuery.post(ajaxurl, woos_data_clean, function(response) {
            jQuery("#wp-admin-bar-create_home_cache a").text("Create home cache");
        }).fail(function() {
            
        });
    });
        </script>
<?php });

add_action( 'wp_ajax_create_new_home_cache', 'create_new_home_cache' );
if( !function_exists('create_new_home_cache') ) {
    function create_new_home_cache() {
        // require config home
        // include THEME_URL . '/configs/config-homepage.php';
        
        $transient_home_data = 'TRANSIENT_HOME_DATA';
        $_config_home = isset(get_option( 'custom_preferences_homepage_data' )['homepage_data_value']) ? get_option( 'custom_preferences_homepage_data' )['homepage_data_value'] : 'ahihis';
        
        ;if( $_config_home == '' ) {
            wp_send_json_error();
            die;
        }
        
        $_config_home = json_decode($_config_home, true);
        // $serialized = serialize($_config_home);
        // $_config_home = unserialize($serialized);
        foreach( $_config_home as $key => $item ) {
            $_key = explode('_', $key)[0];
            if( $_key == 'slider-top' ) {
                for( $i = 0; $i < count($_config_home[$key]); $i++ ) {
                    $_config_home[$key][$i]['payload']['title'] = $_config_home[$key][$i]['payload']['title'] . get_bloginfo('name');
                }
            } else {
                $_config_home[$key]['payload']['title'] = $_config_home[$key]['payload']['title'] . get_bloginfo('name');
            }
            
            
            if( $_key == 'cat' ) {
                $cat_id = $item['payload']['category_id'];
                $args = array(
                    'post_type'             => 'product',
                    'post_status'           => 'publish',
                    // 'ignore_sticky_posts'   => 1,
                    'posts_per_page'        => 12,
                    'paged'                 => 1,
                    'meta_query'            => array(
                        array('relation' => 'AND'),
                        array(
                            'key'           => '_visibility',
                            'value'         => array('catalog', 'visible'),
                            'compare'       => 'IN'
                        )
                    )
                );
                $args['orderby'] = 'date';
                $args['order'] = "DESC";
                
                $args['tax_query'][] = array('relation' => 'AND');
                $args['tax_query'][] = array(
                    'taxonomy'      => 'product_cat',
                    'field'         => 'term_id', //This is optional, as it defaults to 'term_id'
                    'terms'         => $cat_id,
                    'operator'      => 'IN' // Possible values are 'IN', 'NOT IN', 'AND'.
                );
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
                // array_merge($config_home['products'], $productRS);
                $_config_home[$key]['products'] = $productRS;
            }
        }
        
        set_transient($transient_home_data, json_encode($_config_home));
        
        // loop all key "cat_<number>"
        // $config_home
        
        wp_send_json_success($_config_home);
     
        die();
    }
}

// add_action( 'post_submitbox_minor_actions', 'show_btn_clean_post_cache', 30 );
// add_action( 'wp_ajax_clean_post_cache_id', 'clean_post_cache_id' );
// add_action('admin_footer', 'post_script_clean_cache');