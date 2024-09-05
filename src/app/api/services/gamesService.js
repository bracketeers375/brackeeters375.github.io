import pool from "./connection.js";

const getAllGames = async () => {
  try {
    const result = await pool.query('SELECT * FROM Games');  // Use pool for db connection
    return result.rows;
  } catch (err) {
    console.error('Error fetching games', err);
    throw err;
  }
};

export default {
  getAllGames
};
