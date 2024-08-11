const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.APP_CONNECTION_STRING,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

exports.searchTournamentsByName = async (req, res) => {
  const name = req.query.name;

  let query = "SELECT * FROM tournaments WHERE name ILIKE $1";
  let queryParams = [`%${name}%`];

  try {
    const result = await pool.query(query, queryParams);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No tournaments found with the given name." });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for tournaments." });
  }
};
