import pkg from "pg";
const { Pool } = pkg;

let databaseConfig;
if (process.env.NODE_ENV === "production") {
  databaseConfig = { connectionString: process.env.DATABASE_URL };
} else {
  databaseConfig = {
    user: "postgres",
    password: "astronaut",
    host: "localhost",
    database: "local_tournament_db",
    port: 5432,
  };
}

const pool = new Pool(databaseConfig);

export default pool;
