<?php

if( !function_exists('is_mobile') ) {
    function is_mobile() {
        
        if( !class_exists('Mobile_Detect') ) {
            require_once THEME_URL . '/lib/class-mobile-detect.php';
        }

        $detect = new Mobile_Detect();
        $is_mobile = ( $detect->isMobile() || $detect->isTablet() );
        return $is_mobile;
    }
}