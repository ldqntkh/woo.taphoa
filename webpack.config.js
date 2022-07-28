// webpack.config.js
/**
 * Webpack configuration.
 */
 const path = require( 'path' );
 const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
 const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
 const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
//  const cssnano = require( 'cssnano' ); // https://cssnano.co/
 const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
 const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
 const CopyPlugin = require('copy-webpack-plugin');
 const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
//  const ExtractTextPlugin = require('extract-text-webpack-plugin');
 // JS Directory path.
 const JS_DIR = path.resolve( __dirname, 'wp-content/themes/taphoa/private/scripts/js' );
 const REACT_DIR = path.resolve( __dirname, 'wp-content/themes/taphoa/private/scripts/react' );
 const SCSS_DIR = path.resolve( __dirname, 'wp-content/themes/taphoa/private/scss' );
 const IMG_DIR = path.resolve( __dirname, 'wp-content/themes/taphoa/private/images' );
 const BUILD_DIR = path.resolve( __dirname, 'wp-content/themes/taphoa/build' );
 const entry = {
     react_app: REACT_DIR + '/App.js',
     single: JS_DIR + '/app.js',
    //  admin_app: JS_DIR + '/admin/admin-app.js',
    //  admin_react_app: JS_DIR + '/react-admin/App.js',
     // scss
     custom_style: SCSS_DIR + '/client/style.scss',
    //  admin_style: SCSS_DIR + '/admin/style.scss',
 };
 const output = {
     path: BUILD_DIR,
     publicPath: '/wp-content/themes/taphoa/build/',
     filename: 'js/[name].js',
     chunkFilename: "./js/[name].chunk.js"
 };
 /**
  * Note: argv.mode will return 'development' or 'production'.
  */
 const plugins = ( argv ) => [
     new CopyPlugin(
         { 
             patterns: [
                 { from: IMG_DIR, to: './images' }
             ]
         }),
     new FixStyleOnlyEntriesPlugin(),
     new CleanWebpackPlugin( {
         cleanStaleWebpackAssets: ( argv.mode === 'production' )
     } ),
     new MiniCssExtractPlugin( {
         filename: 'css/[name].css'
     } )
 ];
const rules = [
    // {
    //     test: /\.js$/,
    //     include: [ JS_DIR ],
    //     exclude: /node_modules/,
    //     use: 'babel-loader'
    // },
    {
        test: /\.js$/,
        include: [ JS_DIR, REACT_DIR ],
        exclude: /node_modules/,
        use: ["babel-loader"]
    },
    { 
        test: /\.css$/, 
        use: [ 'style-loader', 'css-loader' ]
    },
    {
        // Thiết lập build scss
        test: /\.(sa|sc)ss$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader
            },
            {
                // Interprets CSS
                loader: 'css-loader',
                options: {
                    importLoaders: 2
                }
            },
            // {
            //     // minify CSS và thêm autoprefix
            //     loader: 'postcss-loader',
            //     options: {
            //         ident: 'postcss',

            //         // Đặt chế độ tối ưu
            //         plugins: 'production' !== process.env.NODE_ENV
            //             ? () => []
            //             : () => [
            //                 postcssPresetEnv({
            //                     browsers: ['>1%']
            //                 }),
            //                 require('cssnano')()
            //             ]
            //     }
            // },
            {
                loader: 'sass-loader'
            }
        ]
    },
    {
        // Thiết lập lưu các ảnh sử dụng bởi CSS
        // lưu dưới đường dẫn images cùng file site.css
        test: /\.(png|jpe?g|gif)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    // Image sử dụng bởi CSS lưu tại
                    publicPath: '../images',
                    emitFile: false
                }
            }
        ]
    },    
    // {
    //     test: /\.scss$/,
    //     exclude: /node_modules/,
    //     use: [
    //         MiniCssExtractPlugin.loader,
    //         'css-loader',
    //     ]
    // },
    {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: {
            limit: 1024,
            name: '[name].[ext]',
            publicPath: 'dist/assets/',
            outputPath: 'dist/assets/'
        }
    },
    {
        test: /\.(png|jpg|svg|jpeg|gif|ico)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]',
                publicPath: 'production' === process.env.NODE_ENV ? '../' : '../../'
            }
        }
    }
];
/**
 * Since you may have to disambiguate in your webpack.config.js between development and production builds,
 * you can export a function from your webpack configuration instead of exporting an object
 *
 * @param {string} env environment ( See the environment options CLI documentation for syntax examples. https://webpack.js.org/api/cli/#environment-options )
 * @param argv options map ( This describes the options passed to webpack, with keys such as output-filename and optimize-minimize )
 * @return {{output: *, devtool: string, entry: *, optimization: {minimizer: [*, *]}, plugins: *, module: {rules: *}, externals: {jquery: string}}}
 *
 * @see https://webpack.js.org/configuration/configuration-types/#exporting-a-function
 */
module.exports = ( env, argv ) => ({
    entry: entry,
    output: output,
    /**
     * A full SourceMap is emitted as a separate file ( e.g.  main.js.map )
     * It adds a reference comment to the bundle so development tools know where to find it.
     * set this to false if you don't need it
     */
    devtool: 'source-map',
    module: {
        rules: rules,
    },
    optimization: {
        minimizer: [
            // new OptimizeCssAssetsPlugin( {
            //     cssProcessor: cssnano
            // } ),
            new CssMinimizerPlugin(),
            new UglifyJsPlugin( {
                cache: false,
                parallel: true,
                sourceMap: false
            } )
        ]
    },
    plugins: plugins( argv ),
    externals: {
        jquery: 'jQuery'
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
});