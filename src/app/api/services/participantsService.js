import pool from "./connection.js";

const getParticipantsByTourId = async (tournament_id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM Participants
            WHERE tournament_id =$1`,
      [tournament_id],
    );

    if (result.rows.length === 0) {
      return null; // Return null if no participants is found
    }

    return result.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Database error");
  }
};

export default {
  getParticipantsByTourId,
};
