var express = require('express');
var AWS = require('aws-sdk');

/* create instance of dynamoDB here */

var app = express();

// load AWS credentials
var credentials = new AWS.SharedIniFileCredentials({profile: 'opengallery'});
AWS.config.credentials = credentials;
AWS.config.update({region: 'us-west-1'});

// require middleware/routes
require('./config/middleware.js')(app, express);
require('./config/router.js')(app, express);

// listen to port
var port = Number(process.env.PORT || 8000);
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = app;