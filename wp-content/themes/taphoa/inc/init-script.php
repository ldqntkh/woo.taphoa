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
        // $script_file = THEME_URI . '/build/js/single.js?ver='.STYLE_VERSION;
        // $slick_file =  THEME_URI  . '/build/js/slick.min.js?ver='.STYLE_VERSION;
        // wp_enqueue_script('slickJS', $slick_file, array('jquery'), STYLE_VERSION);
        // wp_enqueue_script('app-script', $script_file, array('jquery'), STYLE_VERSION);
        
        // add custom config header-home-footer
        // $time_version = time();
        // $script_file_header = THEME_URI . '/configs/config-header.js?ver='. $time_version;
        // $script_file_footer = THEME_URI . '/configs/config-footer.js?ver='. $time_version;
        // $script_file_home = THEME_URI . '/configs/config-homepage.js?ver='. $time_version;
        // wp_enqueue_script('script_file_header', $script_file_header, array(), $time_version);
        // wp_enqueue_script('script_file_footer', $script_file_footer, array(), $time_version);
        // wp_enqueue_script('script_file_home', $script_file_home, array(), $time_version);
        include THEME_URL . '/configs/config-header.php';
        include THEME_URL . '/configs/config-footer.php';
        include THEME_URL . '/configs/config-homepage.php';
        ?>
            <script type="text/javascript">
                const config_header = <?= json_encode($config_header); ?>;
                const config_home = <?= json_encode($config_home); ?>;
                const config_footer = <?= json_encode($config_footer); ?>;
            </script>
        <?php
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