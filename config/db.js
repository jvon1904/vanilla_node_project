const { Pool, Client } = require("pg");

let pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  maxLifetimeSeconds: 1,
});

module.exports = {
  pool,
};
