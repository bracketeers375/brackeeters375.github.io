import pool from "./connection.js";

const getEventById = async (id) => {
  let result;
  try {
    result = await pool.query(
      `SELECT *
             FROM Events
             WHERE event_id = $1`,
      [tournId],
    );
  } catch (error) {
    throw new Error("Database query failed");
  }

  return result.rows;
};

const getAllEventsByTournamentId = async (tournId) => {
  let result;
  try {
    result = await pool.query(
      `SELECT *
             FROM Events
             WHERE tournament_id = $1`,
      [tournId],
    );
  } catch (error) {
    throw new Error("Database query failed");
  }

  return result.rows;
};

export default {
  getEventById,
  getAllEventsByTournamentId,
};
