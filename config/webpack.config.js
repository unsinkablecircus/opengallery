var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var outputPath = __dirname + './../public';

module.exports = {
  entry: "./client/index",
  output: {
      path: outputPath,
      filename: "app.js"
  },
  devtool: 'source-map',
  resolve: {
    // you can now require('style') instead of require('style.scss')
    extensions: ['', '.js', '.json', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /typings/]
      },
      // {
      //   test: /\.scss$/,
      //   loaders: ["style", "css", "sass"]
      // }
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("main.css") // what should this be?
  ]
};
