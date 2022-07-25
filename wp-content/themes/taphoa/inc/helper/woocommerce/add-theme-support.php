<?php

if( !function_exists('customtheme_add_woocommerce_support') ) {
    function customtheme_add_woocommerce_support()
    {
        add_theme_support( 'woocommerce' );
    }
    add_action( 'after_setup_theme', 'customtheme_add_woocommerce_support' );
}

// tắt js cart-fragments
if( !function_exists( 'disable_woocommerce_cart_fragments' ) ) {
    add_action( 'wp_enqueue_scripts', 'disable_woocommerce_cart_fragments', 11 ); 
    function disable_woocommerce_cart_fragments() { 
        wp_dequeue_script( 'wc-cart-fragments' ); 
        wp_dequeue_script( 'wc-add-to-cart' );
    }
}

if( !function_exists( 'remove_jquery_migrate' ) ) {
    function remove_jquery_migrate( $scripts ) {
        if ( ! is_admin() && isset( $scripts->registered['jquery'] ) ) {
             $script = $scripts->registered['jquery'];
            if ( $script->deps ) { 
                $script->deps = array_diff( $script->deps, array( 'jquery-migrate' ) );
            }
        }
    }
    add_action( 'wp_default_scripts', 'remove_jquery_migrate' );
}

if( !function_exists( 'remove_woocommerce_style' ) ) {
    function remove_woocommerce_style( $array ) {
        return null;
    }
    add_filter( 'woocommerce_enqueue_styles', 'remove_woocommerce_style' );
}

if( !function_exists( 'slug_disable_woocommerce_block_styles' ) ) {
    function slug_disable_woocommerce_block_styles() {
        wp_dequeue_style( 'wc-block-style' );
        wp_dequeue_style( 'woocommerce-inline' );
        wp_dequeue_style( 'wp-block-library' );
        wp_dequeue_style( 'wp-block-library-theme' );
        wp_dequeue_style( 'wc-block-style' ); // Remove WooCommerce block CSS
    }
    add_action( 'wp_enqueue_scripts', 'slug_disable_woocommerce_block_styles' );
}

if( !function_exists( 'slug_disable_woocommerce_block_editor_styles' ) ) {
    function slug_disable_woocommerce_block_editor_styles() {
        wp_deregister_style( 'wc-block-editor' );
        wp_deregister_style( 'wc-block-style' );
    }
    add_action( 'enqueue_block_assets', 'slug_disable_woocommerce_block_editor_styles', 1, 1 );
}