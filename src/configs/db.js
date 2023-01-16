const { Pool } = require("pg");
const fs = require("fs");
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: true,
  ssl: {
    ca: fs.readFileSync(__dirname + "/ca.crt"),
    rejectUnauthorized: true,
  },
});

module.exports = pool;
