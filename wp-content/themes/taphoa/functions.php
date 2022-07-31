<?php

define( 'THEME_URL', get_stylesheet_directory() );
define( 'THEME_URI', get_stylesheet_directory_uri() );
define( 'INC_PATH', THEME_URL . '/inc' );
define( 'API_PATH', THEME_URL . '/client/api' );
define( 'ADMIN_PATH', THEME_URL . '/admin' );
define( 'TEXT_DOMAIN', 'taphoa' );
define( 'BUILD_PATH_URL', THEME_URL . '/build' );
define( 'BUILD_PATH_URI', THEME_URI . '/build' );
define( 'STYLE_VERSION', time() );

require_once INC_PATH . '/init-inc.php';
require_once API_PATH . '/init-rest-api.php';

