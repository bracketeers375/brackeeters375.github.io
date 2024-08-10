const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.APP_CONNECTION_STRING,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});


app.get("/search", async (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).json({ error: "Name query parameter is required" });
  }

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM tournaments WHERE name ILIKE $1', [`%${name}%`]);
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
