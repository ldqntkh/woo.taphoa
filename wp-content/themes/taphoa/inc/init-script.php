<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if( !function_exists ( 'taphoa_activate_stylesheet_header' ) ) {
    function taphoa_activate_stylesheet_header() {
        // SCSS
        $style_link = THEME_URI . '/build/css/custom_style.css?ver='.STYLE_VERSION;
        wp_enqueue_style( 'custom-style', $style_link, array(), STYLE_VERSION );
    }
    add_action( 'wp_head', 'taphoa_activate_stylesheet_header', 1 );
}

if( !function_exists ( 'taphoa_activate_javascripts' ) ) {
    function taphoa_activate_javascripts() {
        // Javascript
        $script_file = THEME_URI . '/build/js/single.js?ver='.STYLE_VERSION;
        // $slick_file =  THEME_URI  . '/build/js/slick.min.js?ver='.STYLE_VERSION;
        // wp_enqueue_script('slickJS', $slick_file, array('jquery'), STYLE_VERSION);
        wp_enqueue_script('app-script', $script_file, array('jquery'), STYLE_VERSION);
    }
    add_action( 'wp_head', 'taphoa_activate_javascripts', 10 );
}

if( !function_exists('taphoa_activate_javascripts_footer') ) {
    function taphoa_activate_javascripts_footer () {
        $react_app = THEME_URI . '/build/js/react_app.js';
        wp_enqueue_script('react-app', $react_app, array('jquery'), STYLE_VERSION, true);
    }
    add_action( 'wp_footer', 'taphoa_activate_javascripts_footer', 10);
}