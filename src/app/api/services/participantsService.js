import pool from "./connection.js";
import tournamentService from "./tournamentService.js";
import userService from "./userService.js";
import eventsService from "./eventsService.js";

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
        `SELECT p.*, t.tournament_name, u.username
         FROM participants p
                JOIN tournaments t ON t.tournament_id = p.tournament_id
                JOIN users u ON u.user_id = p.user_id
         WHERE t.event_id = $1;`,
        [event_id]
    );

    if (result.rows.length === 0) {
      return [];
    }

    const formattedList = [];

    const participantsMap = new Map();

    result.rows.forEach((current) => {
      if (!participantsMap.has(current.user_id)) {
        const newObj = {
          username: current.username,
          enteredTournaments: [current.tournament_name],
          participantId: current.participants_id,
          eventId: current.event_id,
        };
        participantsMap.set(current.user_id, newObj);
        formattedList.push(newObj);
      } else {
        participantsMap.get(current.user_id).enteredTournaments.push(current.tournament_name);
      }
    });

    return formattedList;
  } catch (error) {
    console.error("Database error during formatted participant retrieval:", error);
    throw new Error("Database error during formatted participant retrieval");
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
    console.log("Database error during participant retrieval by tournament ID:", error);
    throw new Error("Database error during participant retrieval by tournament ID");
  }
};

const joinTournament = async (event_id, tournament_id, token) => {
  console.log(event_id);
  const user = await userService.getUserByToken(token);
  if (!user) {
    throw new Error("No user found.");
  }

  const event = await eventsService.getEventById(event_id);
  if (!event) {
    throw new Error("No event found.");
  }

  const tournament = await tournamentService.getTournamentById(tournament_id);
  if (!tournament) {
    throw new Error("No tournament found.");
  }

  const query = 'INSERT INTO Participants(user_id, username, event_id, tournament_id) VALUES($1, $2, $3, $4)';

  try {
    await pool.query(query, [user.user_id, user.username, event_id, tournament_id]);
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

const leaveTournament = async (event_id, tournament_id, token) => {
  const user = await userService.getUserByToken(token);
  if (!user) {
    throw new Error("No user found.");
  }

  const event = await eventsService.getEventById(event_id);
  if (!event) {
    throw new Error("No event found.");
  }

  const tournament = await tournamentService.getTournamentById(tournament_id);
  if (!tournament) {
    throw new Error("No tournament found.");
  }

  const query = {
    text: "DELETE FROM Participants WHERE user_id = $1 AND event_id = $2 AND tournament_id = $3",
    values: [user.user_id, event_id, tournament_id]
  };

  try {
    await pool.query(query);
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

const isUserParticipantOfTournament = async (tournament_id, token) => {
  const user = await userService.getUserByToken(token);
  if (!user) {
    throw new Error("No user found.");
  }

  const tournament = await tournamentService.getTournamentById(tournament_id);
  if (!tournament) {
    throw new Error("No tournament found.");
  }

  const query = {
    text: "SELECT EXISTS (SELECT 1 FROM Participants WHERE user_id = $1 AND tournament_id = $2)",
    values: [user.user_id, tournament_id]
  };

  try {
    const result = await pool.query(query);
    return result.rows[0].exists;
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

const getParticipantsByTourIdSeedOrder = async (tournament_id) => {
  try {
    const result = await pool.query(
      `SELECT participants.*, tournaments.tournament_name, tournaments.has_started
      FROM participants
      JOIN tournaments
      ON tournaments.tournament_id = participants.tournament_id
      WHERE tournaments.tournament_id=$1
      ORDER BY participants.seed`,
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
  getParticipantsByTourIdSeedOrder,
  addParticipant2Tournament,
  removeParticipantFromTour,
  joinTournament,
  leaveTournament,
  isUserParticipantOfTournament
};
