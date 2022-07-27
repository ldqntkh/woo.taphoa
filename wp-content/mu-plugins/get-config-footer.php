<?php
/*
  Plugin Name: Config Footer
*/
if (!defined( 'ABSPATH')) {
    die;
}

if ( ! filter_input( INPUT_GET, 'footer-ajax' ) ) {
    return;
}

// Define the WordPress "DOING_AJAX" constant.
if ( ! defined( 'DOING_AJAX' ) ) {
    define( 'DOING_AJAX', true );
}

include  ABSPATH . 'wp-content/themes/taphoa/configs/config-footer.php';
wp_send_json_success($config);
die;



