const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getStyleLoaders = function(cssOptions, devMode = false, preProcessor) {
    let cssRules = [
        { loader: devMode ? "style-loader" :  MiniCssExtractPlugin.loader },
        {
            loader: "css-loader",
            options: cssOptions
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                // Necessary for external CSS imports to work
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009',
                    }),
                ],
                sourceMap: true,
            },
        }
    ];
    if(typeof preProcessor !== "undefined"){
        cssRules.push( {
            loader: require.resolve(preProcessor),
            options: { sourceMap: true }
        });
    }
    return cssRules;
};

module.exports = getStyleLoaders;