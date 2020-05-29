const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {

    entry: {
        app: './app/js/main.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        compress: true,
        port: 9000,
        clientLogLevel: "none",
        quiet: true
    },
    module: {
        loaders: [{
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(['dist']),
        new CleanWebpackPlugin({template: './app/views/index.html'})

    ],
    resolve:{
        alias:{
            "vue$":'vue/dist/vue.esm.js'//
        }
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist')
    }
}


// entry

// module

// plugins

// output