<?php
/**
 * The Template for displaying all single products
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://docs.woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
global $product;
get_header(  ); ?>

	<?php
		/**
		 * woocommerce_before_main_content hook.
		 *
		 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
		 * @hooked woocommerce_breadcrumb - 20
		 */
		// do_action( 'woocommerce_before_main_content' );
	?>

		<?php while ( have_posts() ) : ?>
			<?php the_post(); ?>

			<?php 
				// global $product;
				// echo $product;
                // wc_get_template_part( 'content', 'single-product' ); 
            ?>

		<?php endwhile; // end of the loop. ?>

	<?php
		/**
		 * woocommerce_after_main_content hook.
		 *
		 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
		 */
		// do_action( 'woocommerce_after_main_content' );
	?>

	<?php
		/**
		 * woocommerce_sidebar hook.
		 *
		 * @hooked woocommerce_get_sidebar - 10
		 */
		// do_action( 'woocommerce_sidebar' );
	?>

	<div id="main-app-container">
		<div class="loading">
			<div class="outerCircle"></div>
			<div class="innerCircle"></div>
		</div>
	</div>
<?php 
    

	$transient_product = 'TRANSIENT_PRODUCT';
	$payload = get_transient( $transient_product );
	if( !$payload ) {
		$custom_logo_id = get_theme_mod( 'custom_logo' );
		$image = wp_get_attachment_image_src( $custom_logo_id , 'full' );
		$site_logo = '';
		if( isset( $image[0] ) ) $site_logo = $image[0];
		$payload = [
			"page"	=> 'single-product',
			"title"	=> 'Chi tiết sản phẩm',
			"site_logo"	=> $site_logo,
			"product_id"	=> $product->get_id()
		];
	}

?>
<script>
    window.payload = <?= json_encode($payload) ?>;
</script>
<?php
get_footer( );

/* Omit closing PHP tag at the end of PHP files to avoid "headers already sent" issues. */
