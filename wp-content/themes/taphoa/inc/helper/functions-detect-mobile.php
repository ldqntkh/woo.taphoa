<?php

if( !function_exists('is_mobile') ) {
    function is_mobile() {
        require_once INC_PATH . '/lib/class-mobile-detect.php';

        $detect = new Mobile_Detect();
        $is_mobile = ( $detect->isMobile() || $detect->isTablet() );
        return $is_mobile;
    }
}