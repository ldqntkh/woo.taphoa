<?php

// customize remove all script
if( !function_exists('remove_wpb_js_css') ) {
    function remove_wpb_js_css() {
        if ( !is_admin() ) {
            wp_dequeue_script('wpb_composer_front_js');
            wp_deregister_script('wpb_composer_front_js');
    
            wp_dequeue_style('animate-css');
            wp_deregister_style('animate-css');
    
            wp_dequeue_style('wp-block-library');
            wp_deregister_style('wp-block-library');
    
            wp_dequeue_style('wc-block-vendors-style');
            wp_deregister_style('wc-block-vendors-style');
    
            wp_dequeue_style('wc-block-style');
            wp_deregister_style('wc-block-style');
            
            wp_dequeue_style('contact-form-7');
            wp_deregister_style('contact-form-7');
        }
    }
    add_action( 'wp_enqueue_scripts', 'remove_wpb_js_css', 99 );
}
