<?php

if( !function_exists( 'taphoa_setup_theme' ) ) {
    function taphoa_setup_theme() {
        $language_folder = THEME_URL . '/languages';
        load_theme_textdomain( 'taphoa', $language_folder );

        // Set content-width.
        global $content_width;
        if ( ! isset( $content_width ) ) {
            $content_width = 768;
        }

        /*
        * Enable support for Post Thumbnails on posts and pages.
        *
        * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
        */
        add_theme_support( 'post-thumbnails' );

        // Set post thumbnail size.
        set_post_thumbnail_size( 600, 600, true );

        // Add custom image size used in Cover Template.
        add_image_size( 'full-width-horizontal', 640, 320, true );

        add_theme_support( 'title-tag' );
        add_theme_support( 'custom-logo', array(
            'height' => 480,
            'width'  => 720,
        ) );
        add_theme_support( 'automatic-feed-links' );
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'post-formats', array(
            'image', 'video', 'gallery', 'quote', 'link'
        ) );

        // menu
        register_nav_menu( 'primary-menu', __( 'Primary Menu', TEXT_DOMAIN ) );

        // sidebar
        $sidebar = array(
            'name'  => __( 'Main sidebar', TEXT_DOMAIN ),
            'id'    => 'main-sidebar',
            'description'   => __( 'Default sidebar', TEXT_DOMAIN ),
            'before_title'  => '',
            'after_title'   => ''
        );

        register_sidebar( $sidebar );
    }

    add_action( 'init', 'taphoa_setup_theme' );
}