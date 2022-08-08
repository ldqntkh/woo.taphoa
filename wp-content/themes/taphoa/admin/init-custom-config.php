<?php

add_action( 'after_setup_theme', 'init_custom_config_otp' );
function init_custom_config_otp() {
    if ( ! defined( 'ABSPATH' ) ) {
        exit; // Exit if accessed directly.
    }
    
    add_action( 'admin_menu', 'custom_preferences_data' );

    function custom_preferences_data() {
        add_options_page( 'Cấu hình dữ liệu trang chủ', 'Cấu hình dữ liệu trang chủ', 'manage_options', 'config-homepage-data', 'custom_preferences_homepage_data' );
    }

    function custom_preferences_homepage_data() {
        if ( !current_user_can( 'manage_options' ) )  {
            wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
        }

        // render global preferece
        echo '<div id="custom_preferences_homepage_data_fields" class="custom_preferences_tab wrap">';
        echo '<form action="options.php" method="post">';
        settings_fields( 'custom_preferences_homepage_data' );
        do_settings_sections( 'custom_preferences_homepage_data_fields' );
        echo '<input class="button" name="Submit" type="submit" value="' . __( 'Save Changes' ) . '" />';
        echo '</form></div>';
    }



    add_action( 'admin_init', 'custom_preferences_homepage_data_fields_init' );

    function custom_preferences_homepage_data_fields_init() {
        // config global
        register_setting( 'custom_preferences_homepage_data', 'custom_preferences_homepage_data' );
        add_settings_section( 'configuration_homepage_data', 'Cấu hình data', 'configuration_section_otp_title', 'custom_preferences_homepage_data_fields' );
        add_settings_field( 'homepage_data_value', 'Homepage Data', 'config_homepage_data_value', 'custom_preferences_homepage_data_fields', 'configuration_homepage_data' );
        
    }

    function configuration_section_otp_title() {
        echo '<h3>Cấu hình chung</h3>';
    }

    function config_homepage_data_value() {
        $homepage_data_value = isset(get_option( 'custom_preferences_homepage_data' )['homepage_data_value']) ? get_option( 'custom_preferences_homepage_data' )['homepage_data_value'] : '';
      
        echo "<textarea style='width: 100%; height: 400px' id='homepage_data_value' name='custom_preferences_homepage_data[homepage_data_value]'>" . $homepage_data_value . '</textarea>';
    }
}