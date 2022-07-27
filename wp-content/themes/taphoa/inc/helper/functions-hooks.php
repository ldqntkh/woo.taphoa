<?php

// add body class
if( !function_exists('taphoa_body_classes') ) {
    function taphoa_body_classes($classes) {
        // $user_id = get_current_user_id();
        // if( !$user_id ) $cls = ' not-login';
        if( !is_mobile() ) {
            $classes[] = 'body-desktop' ;
        } else {
            $classes[] = 'body-mobile' ;
        }
        
        return $classes;
    }

    add_filter( 'body_class', 'taphoa_body_classes', 100, 1 );
}

// Disable admin bar
add_filter('show_admin_bar', '__return_false');