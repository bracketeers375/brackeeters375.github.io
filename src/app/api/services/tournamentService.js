import pool from "./connection.js";
import { InMemoryDatabase } from "brackets-memory-db";
import { BracketsManager, helpers } from "brackets-manager";

const storage = new InMemoryDatabase();
const manager = new BracketsManager(storage);

const getAllTournaments = async () => {
    try {
    const result = await pool.query(
      `SELECT *FROM Tournaments`
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
}

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

const getTournamentsByEventId = async (event_id) => {
    try {
        const result = await pool.query(
            `SELECT t.tournament_id, t.tournament_name, g.game_name 
       FROM Tournaments t
       JOIN Games g ON t.game_id = g.game_id
       WHERE t.event_id = $1`,
            [event_id]
        );

        if (result.rows.length === 0) {
            return [];
        }

        return result.rows;
    } catch (error) {
        console.log(error);
        throw new Error("Database error");
    }
};

const createTournament = async (t_name, g_id, e_id,) => {

  //Getting the row with highest tournament_id
  //SELECT * FROM TOURNAMENTS ORDER BY tournament_id desc limit 1;
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

const updateTournamentJson = async (tourId, tourData) => {
  try {
    await pool.query(
      `UPDATE tournaments
      SET tournament_json = $1
      WHERE tournament_id = $2`,
      [tourData, tourId],
    ).then((result) => {

    });
  } catch (error) {
    console.log(error);
    throw new Error("Database error");
  }
};

const updateHasStarted = async (tourId, newStatus) => {
  try {
  await pool.query(
    `UPDATE tournaments
    SET has_started = $1
    WHERE tournament_id = $2`,
    [newStatus, tourId],
  ).then((result) => {

  });
  } catch (error) {
    console.log(error);
    throw new Error("Database error");
  }
}

const deleteTournament = async (id) => {
  // TODO
};


export default {
  getTournamentById,
  getTournamentsByEventId,
  createTournament,
  updateTournamentJson,
  deleteTournament,
  getAllTournaments,
  updateHasStarted
};
