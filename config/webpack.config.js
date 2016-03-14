var path = require('path');
var webpack = require('webpack');

var outputPath = __dirname + './../public';

module.exports = {
  entry: "./client/index",
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
        exclude: [/node_modules/, /typings/]
      }
    ]
  }
};
