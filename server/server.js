var express = require('express');
const path = require('path')

var app = express();

// require routes
require('./config/middleware.js')(app, express);
require('./config/router.js')(app, express);

// listen to port
var port = Number(process.env.PORT || 8000);
if(!module.parent){
  app.listen(port, function() {
    console.log(`  🎨  Open Gallery | Node listening on port ${port}`);
  });
}

module.exports = app;
