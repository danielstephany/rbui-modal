const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    new HtmlWebpackPlugin({
        title: 'sandbox',
        filename: 'index.html',
        template: './examples/public/index.html',
        chunks: ['sandbox']
    })
]