// upload media to s3 (async)
// on upload, store image url to postgreSQL db
const pg = require('../db/database')

const Media = pg.Model.extend({
  tableName: 'media',
  hasTimestamps: true
})

module.exports = Media;

/*
var Link = db.Model.extend({
  tableName: 'urls',
  hasTimestamps: true,
  defaults: {
    visits: 0
  },
  clicks: function() {
    return this.hasMany(Click);
  },
  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      var shasum = crypto.createHash('sha1');
      shasum.update(model.get('url'));
      model.set('code', shasum.digest('hex').slice(0, 5));
    });
  }
});

module.exports = Link;
*/