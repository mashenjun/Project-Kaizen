"use strict"
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");
var BUILD_DIR = path.resolve(__dirname, '../pages/static/dist');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
    entry: ['babel-polyfill', APP_DIR + '/js/index.jsx'],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            include: APP_DIR,
            exclude: /(node_modules|bower_components|dist)/,
            loader: "babel"
        }, {
            test: /\.less$|\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            loader: 'url-loader?limit=10000&name=./images/[name].[ext]'
        }]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({ // <-- key to reducing React's size
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(), //dedupe similar code 
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compressor: {
                warnings: false
            },
            output: {
                comments: false,
            },
        }), //minify everything
        new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks,
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    performance: { hints: false },
    devServer: {
        publicPath: '/dist',
        filename: 'bundle.js',
        port: 8081,
        host: '0.0.0.0'
    }
}

module.exports = config;
