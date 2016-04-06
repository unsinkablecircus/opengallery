var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);


/* -------------------------- */
/*     MIDDLEWARE & ROUTES    */
/* -------------------------- */

require('./config/middleware')(app, express);
require('./config/router')(app, express);

/* -------------- */
/*     SERVER     */
/* -------------- */



var port = Number(process.env.PORT || 8000);
if(!module.parent){
  http.listen(port, function(err) {
    if (err) {
      console.error(`Node Server Error: ${err}`);
    }
    console.log(`  🎨  Open Gallery | Node listening on port ${port}`);
  });
}

module.exports = app;





io.on('connection', function(socket) {
  console.log('hello world');
})