var express = require('express');
var app = express();

/* -------------------------- */
/*     MIDDLEWARE & ROUTES    */
/* -------------------------- */

require('./config/middleware')(app, express);
require('./config/router')(app, express);

/* -------------- */
/*     SERVER     */
/* -------------- */
console.log('process.env.PRODUCTION on main server: ', process.env.PRODUCTION);
console.log('process.env.PORT on main server: ', process.env.PORT);

var port = Number(process.env.PORT || 8000);
if(!module.parent){
  app.listen(port, function(err) {
    if (err) {
      console.error(`Node Server Error: ${err}`);
    }
    console.log(`  🎨  Open Gallery | Node listening on port ${port}`);
  });
}

module.exports = app;
