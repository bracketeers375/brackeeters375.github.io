import pkg from "pg";
const { Pool } = pkg;

let databaseConfig;
// fly.io sets NODE_ENV to production automatically, otherwise it's unset when running locally
if (process.env.NODE_ENV === "production") {
	databaseConfig = {  
        connectionString: process.env.APP_CONNECTION_STRING,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000, };
} else {
    let {PGPASSWORD} = process.env;
	databaseConfig = { 
        user: "postgres",
        password: "astronautHyper6Zhou",
        database: "local_tournament_db",
        host: "localhost",
        port: "5432",
     };
}


const pool = new Pool(databaseConfig);

export default pool;