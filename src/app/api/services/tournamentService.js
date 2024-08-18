import pool from "./connection.js";

const getTournamentById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT *
      FROM Tournaments
      WHERE tournament_id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return null; // Return null if no tournament is found
    }
    //console.log("reached service");
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error("Database error");
  }
};

const createTournament = async (tournamentData) => {
  // TODO
};

const updateTournament = async (id, tournamentData) => {
  // TODO
};

const deleteTournament = async (id) => {
  // TODO
};

export default {
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament,
};
