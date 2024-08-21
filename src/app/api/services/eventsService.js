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

const createEvent = async (eventName) => {
  try {
      await pool.query(
          `INSERT INTO events(event_name)
          VALUES ($1)`, [eventName]
      );
  } catch(error) {
      console.log(error);
      throw new Error("Database error");
  }
}

const updateEvent = async (eventName, updatedEventName) => {
  try {
      await pool.query(
          `UPDATE events SET event_name = $1 WHERE event_name = $2`, [updatedEventName, eventName]
      );
  } catch(error) {
      console.log(error);
      throw new Error("Database error");
  }
}

const deleteEvent = async (eventName) => {
  try {
      await pool.query(
          `DELETE FROM events WHERE event_name = $1`, [eventName]
      );
  } catch(error) {
      console.log(error);
      throw new Error("Database error");
  }
}

export default {
  getEventById,
  getAllEventsByTournamentId,
  createEvent,
  updateEvent,
  deleteEvent,
};
