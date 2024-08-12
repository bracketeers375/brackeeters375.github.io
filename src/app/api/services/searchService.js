import pool from "./connection.js";

const getTournamentsByName = async (name) => {
  try {
    const result = await pool.query(
      `SELECT * FROM tournaments WHERE name ILIKE $1`,
      [name],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Database error");
  }
};

export default {
  getTournamentsByName,
};
