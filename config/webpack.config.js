var path = require('path');
var webpack = require('webpack');

var outputPath = __dirname + '../../public';

module.exports = {
  entry: "./client/components/App.js",
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
        include: path.resolve(__dirname, './client'),
        // exclude: [/node_modules/, /typings/],
        query: {
            presets: ['es2015', 'react']
        } 
      }
    ]
  }
};