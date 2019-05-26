const webpack = require('webpack')
const path = require('path')

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, '.'),
    entry: {
        index: "./lib/index.js",
        test: "./lib/test.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        library: 'CQuant',
        libraryTarget: 'umd',
        filename: "[name].js"
    },
    node: {
        "fs": "empty"
    },
    module: {
        rules: [
            {
                test: /cquant\.js$/,
                loader: "exports-loader"
            },
            {
                test: /\.wasm$/,
                type: "javascript/auto",
                loader: "file-loader",
                options:{
                    name:'[name].[ext]'
                }
            }
        ]
    }
}