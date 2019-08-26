const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    new HtmlWebpackPlugin({
        title: 'sandbox',
        filename: 'index.html',
        template: './examples/public/index.html',
        chunks: ['sandbox']
    }),
    new HtmlWebpackPlugin({
        title: 'showcase',
        filename: 'showcase.html',
        template: './examples/public/showcase.html',
        chunks: ['showcase']
    }),
]