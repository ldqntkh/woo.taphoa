<?php
get_header(); ?>

<div id="main-app-container">
    <div class="loading">
        <div class="outerCircle"></div>
        <div class="innerCircle"></div>
    </div>
</div>
<?php 
    $custom_logo_id = get_theme_mod( 'custom_logo' );
    $image = wp_get_attachment_image_src( $custom_logo_id , 'full' );
    $site_logo = '';
    if( isset( $image[0] ) ) $site_logo = $image[0];

    $page = 'page';
    if( is_account_page() ) {
        $page = 'account';
    }
?>
<script>
    window.payload = {
        page: '<?= $page ?>',
        title: 'Nội dung trang chủ',
        user_id: <?= get_current_user_id() ?>,
        site_logo: '<?= $site_logo ?>'
    };
</script>
<?php
get_footer();