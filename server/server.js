var express = require('express');
var AWS = require('aws-sdk');

// adding connection to postgresql on main server.js for now, but we will move to separate models when we are ready
var pg = require('pg');
var connectionInfo = {
  host: 'opengallery.cbxmygjagdjr.us-west-1.rds.amazonaws.com',
  port: '5432',
  user: process.env.AWS_POSTGRESQL_USERNAME,
  password: process.env.AWS_POSTGRESQL_PW,
  database: 'opengallery'
};

var app = express();

// load AWS credentials
var credentials = new AWS.SharedIniFileCredentials({profile: 'opengallery'});
AWS.config.credentials = credentials;
AWS.config.update({region: 'us-west-1'});

// require middleware/routes
require('./config/middleware.js')(app, express);
require('./config/router.js')(app, express);

// example of connecting to postgresql database below (will move to models later):
// var client = new pg.Client(connectionInfo);
// client.connect();
// var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// query.on('end', function() { client.end(); });

// listen to port
var port = Number(process.env.PORT || 8000);
app.listen(port, function() {
  console.log(`  🎨  Open Gallery | Node listening on port ${port}`);
});

module.exports = app;
