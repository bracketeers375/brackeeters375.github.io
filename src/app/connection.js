import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.APP_CONNECTION_STRING,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export default pool;