import pool from "./connection.js";

const getTournamentsByName = async (name) => {
  try {
    const result = await pool.query(
      `SELECT * FROM tournaments WHERE tournament_name ILIKE $1`,
      [`%${name}%`],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows;
  } catch (error) {
    console.error("Error querying tournaments:", error);
    throw new Error(`Database error: ${error.message}`);
  }
};

const getGamesByName = async (name) => {
  try {
    const result = await pool.query(
      `SELECT * FROM Games WHERE game_name ILIKE $1`,
      [`%${name}%`],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows;
  } catch (error) {
    console.error("Error querying events:", error);
    throw new Error(`Database error: ${error.message}`);
  }
};

export default {
  getTournamentsByName,
  getGamesByName,
};
