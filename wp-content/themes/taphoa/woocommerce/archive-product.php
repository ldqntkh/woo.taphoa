<?php
/**
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;

get_header(  );

/**
 * Hook: woocommerce_before_main_content.
 *
 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
 * @hooked woocommerce_breadcrumb - 20
 * @hooked WC_Structured_Data::generate_website_data() - 30
 */
// do_action( 'woocommerce_before_main_content' );

?>

<?php

$transient_archive = 'TRANSIENT_ARCHIVE';
if( is_shop() ) {
    $transient_archive = $transient_archive . '_SHOP';
} else {
    $transient_archive = $transient_archive . '_PRODUCT';
}

$payload = get_transient($transient_archive);
if( $payload ) {
    $payload = json_decode( $payload );
} else {
    if( is_shop() ) {
        $count_posts = wp_count_posts( 'product' );
        $paged = ( get_query_var('paged') ) ? get_query_var('paged') : 1;
        $payload = [
            "page" => 'product-shop',
            "title" => woocommerce_page_title(false),
            "paged" => $paged,
            "total" => $count_posts->publish,
            "cat_url" => get_permalink( wc_get_page_id( 'shop' ) )
        ];
    } else {
        $category = get_queried_object();
        $paged = ( get_query_var('paged') ) ? get_query_var('paged') : 1;
        $category_id = $category->term_id;
        $category_slug = $category->slug;
        $total = $category->count;
        $url = get_category_link( $category_id );
        $payload = [
            "page" => 'product-archive',
            "title" => $category->name . ' - ' . get_bloginfo('name'),
            // "category" => json_encode($category),
            "paged" => $paged,
            "category_id" => $category_id,
            "category_slug" => $category_slug,
            "total" => $total,
            "cat_url" => $url
        ];
    }
    set_transient( $transient_archive, json_encode( $payload ), 8 * 3600 );
}




?>
    <script>
        window.payload = <?php echo json_encode($payload) ?> ;
    </script>
<?php
// if ( woocommerce_product_loop() ) {

// 	/**
// 	 * Hook: woocommerce_before_shop_loop.
// 	 *
// 	 * @hooked woocommerce_output_all_notices - 10
// 	 * @hooked woocommerce_result_count - 20
// 	 * @hooked woocommerce_catalog_ordering - 30
// 	 */
// 	do_action( 'woocommerce_before_shop_loop' );

// 	woocommerce_product_loop_start();

// 	if ( wc_get_loop_prop( 'total' ) ) {
// 		while ( have_posts() ) {
// 			the_post();

// 			/**
// 			 * Hook: woocommerce_shop_loop.
// 			 */
// 			do_action( 'woocommerce_shop_loop' );

// 			wc_get_template_part( 'content', 'product' );
// 		}
// 	}

// 	woocommerce_product_loop_end();

// 	/**
// 	 * Hook: woocommerce_after_shop_loop.
// 	 *
// 	 * @hooked woocommerce_pagination - 10
// 	 */
// 	do_action( 'woocommerce_after_shop_loop' );
// } else {
// 	/**
// 	 * Hook: woocommerce_no_products_found.
// 	 *
// 	 * @hooked wc_no_products_found - 10
// 	 */
// 	do_action( 'woocommerce_no_products_found' );
// }

// /**
//  * Hook: woocommerce_after_main_content.
//  *
//  * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
//  */
// do_action( 'woocommerce_after_main_content' );

// /**
//  * Hook: woocommerce_sidebar.
//  *
//  * @hooked woocommerce_get_sidebar - 10
//  */
// do_action( 'woocommerce_sidebar' );
?>
    <div id="main-app-container">
	</div>
<?php
get_footer(  );
