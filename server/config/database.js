const knex = require('knex');

module.exports = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'root',
      database : 'face-detect'
    }
});

