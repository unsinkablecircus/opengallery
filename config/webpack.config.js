var path = require('path');
var webpack = require('webpack');

var outputPath = __dirname + '/client';

module.exports = {
    entry: "./../client/components/App.js",
    output: {
        path: outputPath,
        filename: "app.js"
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { 
                test: /\.jsx?$/, 
                loader: 'babel-loader',
                exclude: [/node_modules/, /typings/],
                query: {
                    presets: ['es2015', 'react']
                } 
            }
        ]
    }
};