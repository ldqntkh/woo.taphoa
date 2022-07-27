<?php 

get_header(); ?>

<div id="main-app-container">
    
</div>
<?php 
    $custom_logo_id = get_theme_mod( 'custom_logo' );
    $image = wp_get_attachment_image_src( $custom_logo_id , 'full' );
    $site_logo = '';
    if( isset( $image[0] ) ) $site_logo = $image[0];
?>
<script>
    window.payload = {
        page: 'home',
        title: 'Nội dung trang chủ',
        site_logo: '<?= $site_logo ?>'
    };
</script>
<?php
get_footer();