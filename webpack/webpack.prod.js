const common = require('./webpack.common');
const htmlFiles = require('./views/viewArray.js');
const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const getStyleLoaders = require('./utils/getStyleLoaders.js');
let commonChunkName;

if(common.commonChunkName){
    commonChunkName = common.commonChunkName;
    delete common.commonChunkName;
}

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties', '@babel/plugin-transform-react-jsx']
                    } 
                }
            },
            {
                test: /\.css$/,
                use: getStyleLoaders({
                    importLoaders: 1
                }, false)
            },
            {
                test: /\.scss$/,
                use: getStyleLoaders({
                    importLoaders: 2,
                    sourceMap: true
                }, false, 'sass-loader')
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/images',
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/fonts',
                    }
                }
            },
            {
                test: /\.(html)$/,
                include: path.join(__dirname, 'src/views'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/fonts',
                        }
                    }, 
                    {
                        loader: 'html-loader',
                        options: {
                            interpolate: true
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: `${commonChunkName}.vendors`,
                    chunks: "all",
                    minChunks: commonChunkName ? 2 : 10000
                }
            }
        }
    },
    resolve: {
        alias: {
            globalComponents: path.resolve(__dirname, '../src/assets/js/globalComponents/')
        }
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].min.css"
        }),
        new OptimizeCssAssetsPlugin(),
        ...htmlFiles,
        new HtmlBeautifyPlugin({
            config: {
                html: {
                    end_with_newline: true,
                    indent_size: 2,
                    indent_with_tabs: true,
                    indent_inner_html: true,
                    preserve_newlines: true,
                    unformatted: ['p', 'i', 'b', 'span']
                }
            },
            replace: [' type="text/javascript"']
        })
    ]
});