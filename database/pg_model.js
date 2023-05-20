const { Pool } = require('pg');
const { Client } = require('pg');
require('dotenv').config(); // use this where we need DB

// process.env.PG_URI; // config generates process.env
const PG_URI = 'postgres://hueucqsd:R_BlEuEVeZb9lPD3OG1Z-urP1pWIhGHO@queenie.db.elephantsql.com/hueucqsd';
// create a new pool here using the connection string above
// const client = new Client({
//   connectionString: PG_URI,
// });
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    //console.log('executed que');
    return pool.query(text, params, callback);
  },
};
