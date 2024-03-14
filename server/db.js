/**
 * Creates a Connection Pool to the Postgres database,
 * which we can use to make queries.
 * @constant {Pool} DB_POOL 
 */
const { Pool } = require('pg');

const pool = new Pool({
  host: 'postgresdb',
  port: 5432,
  user: 'root',
  password: 'pass',
  database: "rms_db",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

module.exports = { pool };
