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

const getParticipantsByEventIdFormatted = async (event_id) => {
  try {
    const result = await pool.query(
      `SELECT participants.*, tournaments.tournament_name
      FROM participants
      JOIN tournaments
      ON tournaments.tournament_id = participants.tournament_id
      WHERE tournaments.event_id= $1;`,
      [event_id],
    );

    if (result.rows.length === 0) {
      return null; // Return null if no participants is found
    }
    console.log(result.rows);
    let formattedList = {};
    for(let i = 0; i < result.rows.length; i++) {
      let current = result.rows[i];
      if(!formattedList.hasOwnProperty(current.user_id)) {
        let newObj = {
          username: current.username,
          enteredTournaments: [current.tournament_name],
          participantId: current.participants_id,
          eventId: current.event_id
        }
        formattedList[current.user_id] = newObj;
      } else {
        formattedList[current.user_id].enteredTournaments.push(current.tournament_name);
      }
    }
    return formattedList;
  } catch (error) {
    console.log(error);
    throw new Error("Database error");
  }
};

const getParticipantsByTourId = async (tournament_id) => {
  try {
    const result = await pool.query(
      `SELECT participants.*, tournaments.tournament_name, tournaments.has_started
      FROM participants
      JOIN tournaments
      ON tournaments.tournament_id = participants.tournament_id
      WHERE tournaments.tournament_id=$1`,
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
  tournament_id
) => {
  console.log(user_id);
  console.log(username);
  console.log(event_id);
  console.log(tournament_id);
  if (
    !user_id ||
    !username ||
    !event_id ||
    !tournament_id
  ) {
    throw new Error("Missing features");
    return;
  }

  try {
    let result = await pool.query(
      `
      INSERT INTO 
      Participants(user_id, username, event_id, tournament_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      [user_id, username, event_id, tournament_id],
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

const removeParticipantFromTour = async (participants_id) => {
  try {
    const result = await pool.query(
      `DELETE FROM Participants
      WHERE participants_id = $1`,
      [participants_id],
    );
  }  catch (error) {
    console.log(error);
    throw new Error("Database error");
  }

}

export default {
  getParticipantsByEventId,
  getParticipantsByEventIdFormatted,
  getParticipantsByTourId,
  addParticipant2Tournament,
  removeParticipantFromTour
};
