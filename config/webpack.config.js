var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var paths = {
  entry: path.resolve(__dirname, '../client/index'),
  output: path.resolve(__dirname, '../public'),
  local: 'http://localhost:8000/',
  hot: 'webpack-hot-middleware/client?path=/__webpack_hmr',
  bourbon: require('node-bourbon').includePaths
    .map(sassPath => "includePaths[]=" + sassPath).join('&')
};

module.exports = {
  entry: [paths.hot, paths.entry],
  output: {
    path: paths.output,
    publicPath: paths.local,
    filename: 'app.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.json', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('main.css')
  ]
};
