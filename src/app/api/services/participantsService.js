import pool from "./connection.js";

const getParticipantsByEventId = async (event_id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM Participants
            WHERE event_id = $1`,
      [event_id],
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

const addParticipant2Tournament = async (
  user_id,
  username,
  event_id,
  tournament_id,
  game_id,
  game_name,
) => {
  console.log(user_id);
  console.log(username);
  console.log(event_id);
  console.log(tournament_id);
  console.log(game_id);
  console.log(game_name);
  if (
    !user_id ||
    !username ||
    !event_id ||
    !tournament_id ||
    !game_id ||
    !game_name
  ) {
    throw new Error("Missing features");
    return;
  }

  try {
    let result = await pool.query(
      `
      INSERT INTO 
      Participants(user_id, username, event_id, tournament_id, game_id, game_name)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [user_id, username, event_id, tournament_id, game_id, game_name],
    );

    return result.rows;
  } catch (error) {
    switch (error.code) {
      case "23505": // i.e. Duplicate key constraint violated
        throw new Error("Participant already exists");
      default:
        console.log(error);
        throw new Error("Database error");
    }
  }
};

export default {
  getParticipantsByEventId,
  getParticipantsByTourId,
  addParticipant2Tournament,
};
