var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var paths = {
  entry: path.resolve(__dirname, '../client/index'),
  output: path.resolve(__dirname, '../public'),
  local: `http://${process.env.HOSTNAME}:${process.env.PORT}/`,
  bourbon: require('node-bourbon').includePaths
    .map(sassPath => "includePaths[]=" + sassPath).join('&')
};

module.exports = {
  entry: [paths.entry],
  output: {
    path: paths.output,
    publicPath: paths.local,
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.json', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: [/node_modules/, /typings/]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style',
          'css?sourceMap!sass?sourceMap&' + paths.bourbon)
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('main.css')
  ]
};
