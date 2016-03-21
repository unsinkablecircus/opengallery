var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var bourbon = require('node-bourbon').includePaths.map(sassPath => "includePaths[]=" + sassPath).join('&');

var outputPath = __dirname + './../public';

module.exports = {
  entry: "./client/index",
  output: {
      path: outputPath,
      filename: "app.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.json', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /typings/]
      },
      {
        test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap&' + bourbon) }
    ]
  },
  plugins: [
    new ExtractTextPlugin("main.css")
  ]
};
