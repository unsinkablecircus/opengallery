var express = require('express');
var AWS = require('aws-sdk');

/* create instance of dynamoDB here */

var app = express();

// require middleware/routes
require('./config/middleware.js')(app, express);
require('./config/router.js')(app, express);

// listen to port
var port = Number(process.env.PORT ||  8000);
app.listen(port, function() {
  console.log(`  🎨  Open Gallery | Node listening on port ${port}`);
});

module.exports = app;
