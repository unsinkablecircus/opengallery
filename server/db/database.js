const connectionInfo = {
  host: 'opengallery.cbxmygjagdjr.us-west-1.rds.amazonaws.com',
  port: '5432',
  user: process.env.AWS_POSTGRESQL_USERNAME,
  password: process.env.AWS_POSTGRESQL_PW,
  database: 'opengallery'
};

const client = new pg.Client(connectionInfo);

const pg = require('knex')({
  client: 'pg',
  connection: connectionInfo,
  searchPath: 'knex,public'
});

module.exports = pg;


