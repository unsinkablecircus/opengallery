var path = require('path');
var webpack = require('webpack');

var outputPath = __dirname + '/client';

module.exports = {
    entry: "./entry.js",
    output: {
        path: outputPath,
        filename: "app.js"
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { 
                test: /\.css$/, 
                loader: "style!css",
                exclude: [/node_modules/, /typings/],
                query: {
                    presets: ['es2015', 'react']
                } 
            }
        ]
    }
};