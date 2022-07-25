<?php

// add body class
if( !function_exists('taphoa_body_classes') ) {
    function taphoa_body_classes() {
        $cls = '';
        // $user_id = get_current_user_id();
        // if( !$user_id ) $cls = ' not-login';
        if( !is_mobile() ) {
            $classes[] = 'body-desktop' . $cls;
        } else {
            $classes[] = 'body-mobile' . $cls;
        }
        return $classes;
    }

    add_filter( 'body_class','taphoa_body_classes' );
}

// Disable admin bar
add_filter('show_admin_bar', '__return_false');