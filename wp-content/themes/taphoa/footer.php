
    
        <footer id="colophon" class="site-footer">

<?php
    echo '<div id="widget-ft-one">';
    dynamic_sidebar( 'footer-one-widget' );
    echo '</div>';

    echo '<div id="widget-ft-two">';
    dynamic_sidebar( 'footer-two-widget' );
    echo '</div>';
    
?>


</footer><!-- #colophon -->
</div>
<?php wp_footer(); ?>
<?php do_action('before_close_body'); ?>
</body>
</html>
