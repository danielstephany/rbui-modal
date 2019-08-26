const path = require('path');


module.exports = {
    entry: {
        sandbox: './examples/sandbox/index.js',
        showcase: './examples/showcase/index.js'
        
    },
    output: {
        filename: "js/[name].bundle.js",
        path: path.resolve(__dirname, '../examples/dist')
    },
    resolve: {
        alias: {
            "dsui-modal": path.resolve(__dirname, "../src")
        }
    },
}