var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var paths = {
  public: path.resolve(__dirname, '../../public'),
  webpack: path.resolve(__dirname, '../../config/webpack.config'),
  webpackProd: path.resolve(__dirname, '../../config/webpack.prod.config')
};

var webpack = require('webpack');
var config = require(paths.production ? paths.webpackProd : paths.webpack);
var compiler = webpack(config);

module.exports = function (app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
  app.use(bodyParser.json());

  if (process.env.PRODUCTION !== 'production') {
    app.use(require('webpack-dev-middleware')(compiler, {
      inline: true,
      hot: true,
      reload: true,
      overlay: true,
      timeout: 20000,
      stats: {
        colors: true,
        version: false,
        chunks: false,
        children: false
      },
      publicPath: config.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
      log: console.log,
      path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));
  }

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://opengallery.io');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
  });

  app.use(express.static(paths.public));
};
