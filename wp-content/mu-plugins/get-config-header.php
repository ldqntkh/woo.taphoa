<?php
/*
  Plugin Name: Config Header
*/
if (!defined( 'ABSPATH')) {
    die;
}

if ( ! filter_input( INPUT_GET, 'header-ajax' ) ) {
    return;
}

// Define the WordPress "DOING_AJAX" constant.
if ( ! defined( 'DOING_AJAX' ) ) {
    define( 'DOING_AJAX', true );
}

include  ABSPATH . 'wp-content/themes/taphoa/configs/config-header.php';
wp_send_json_success($config);
die;



