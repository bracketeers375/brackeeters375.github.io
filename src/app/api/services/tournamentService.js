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


const getAllTournamentsByEventId = async (event_id) => {
  try {
      const result = await pool.query(
        `SELECT *
        FROM Tournaments
        WHERE event_id = $1`,
        [event_id],
      );

      if(result.rows.length === 0 ) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("Database error");
    }
}

const createTournament = async (t_name, g_id, e_id,) => {
  
  try {
    await pool.query(
      `INSERT INTO tournaments(tournament_name, game_id, event_id)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [t_name, g_id, e_id],
    ).then((result) => {
      //console.log("result of POST: ", result);
    });
  } catch (error) {
    console.log(error);
    throw new Error("Database error");
  }
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
  getAllTournamentsByEventId,
};
