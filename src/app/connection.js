import pkg from "pg";
const { Pool } = pkg;

let databaseConfig;
// fly.io sets NODE_ENV to production automatically, otherwise it's unset when running locally
if (process.env.NODE_ENV == "production") {
	databaseConfig = { connectionString: process.env.DATABASE_URL };
} else {
	databaseConfig = {
                                "user": "postgres",
                                "password": "astronautHyper6Zhou",
                                "host": "localhost",
                                "database": "local_tournament_db",
                                "port": 5432 };
}

const pool = new Pool(databaseConfig);

export default pool;