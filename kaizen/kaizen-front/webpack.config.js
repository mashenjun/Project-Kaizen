"use strict"
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
    entry: APP_DIR + '/js/index.jsx',
    debug: true,
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: APP_DIR,
            exclude: /(node_modules|bower_components|dist)/,
            loader: "babel"
        },
            {test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
            // {  test: /\.less$|\.css$/,
            //     loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ],
    devServer: {
        publicPath: '/dist',
        filename: 'bundle.js',
        port: 8081,
        host: '0.0.0.0'
    }
}

module.exports = config;
