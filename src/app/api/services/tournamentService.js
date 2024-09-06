import pool from "./connection.js";
import { InMemoryDatabase } from "brackets-memory-db";
import { BracketsManager, helpers } from "brackets-manager";
import participantsService from "./participantsService.js";

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

const createTournament = async (t_name, g_id, e_id, h_id, t_id) => {

  //Getting the row with highest tournament_id
  //SELECT * FROM TOURNAMENTS ORDER BY tournament_id desc limit 1;
  try {
    await pool.query(
      `INSERT INTO tournaments(tournament_name, game_id, event_id, has_started, tournament_format)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
      [t_name, g_id, e_id, h_id, t_id],
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

const updateTournamentJsonForMatch = async (tourId, tourData) => {
  try {
    await pool.query(
      `UPDATE tournaments
      SET tournament_json = $1, has_started = $3
      WHERE tournament_id = $2`,
      [tourData, tourId, 'true'],
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

const genAndUpdateTournamentJson = async (tournament_id) => {
  try {
    let config;
    let seedOrder;
    const tournamentData = await getTournamentById(tournament_id);
    const particpantsList = await participantsService.getParticipantsByTourIdSeedOrder(tournament_id);
    let formattedPartList = [];
    const format = tournamentData.tournament_format;
    const hasStarted = tournamentData.has_started;


    if(hasStarted) {
      return "Has started";
    }

    for(let i = 0; i < particpantsList.length; i++) {
      let currPart = particpantsList[i];
      formattedPartList.push(currPart.username);
    }

    console.log("format: ", format);
    switch (format) {
    case "single_elimination":
      seedOrder = ["inner_outer"];
      const singleEliminationSettings = {
        seedOrdering: seedOrder,
        consolationFinal: false,
        size: helpers.getNearestPowerOfTwo(formattedPartList.length)
      };
      config = {
        tournamentId: tournamentData.tournament_id,
        type: format,
        name: tournamentData.tournament_name,
        settings: singleEliminationSettings,
        seeding: formattedPartList,
      };
      break;
    case "double_elimination":
      seedOrder = ["inner_outer"];
      const doubleEliminationSettings = {
        seedOrdering: seedOrder,
        consolationFinal: false,
        skipFirstRound: false,
        grandFinal: 'double',
        size: helpers.getNearestPowerOfTwo(formattedPartList.length),
      };

      config = {
        tournamentId: tournamentData.tournament_id,
        name: tournamentData.tournament_name,
        type: format,
        settings: doubleEliminationSettings,
        seeding: formattedPartList,
      };
      break;

    case "round_robin":
      const roundRobinSettings = {
        roundRobinMode: "simple",
        groupCount: 1,
        size: helpers.getNearestPowerOfTwo(formattedPartList.length),
      };

      config = {
        tournamentId: tournamentData.tournament_id,
        name: tournamentData.tournament_name,
        type: format,
        settings: roundRobinSettings,
        seeding: formattedPartList,
      };
      break;
  }

    storage.reset();
    await manager.create.stage(config);
    let jsonData = await manager.export();

    await updateTournamentJson(tournament_id, jsonData);
    return jsonData;


  } catch (error) {
    console.log(error);
    throw new Error("Database error");
  }

};


export default {
  getTournamentById,
  getTournamentsByEventId,
  createTournament,
  updateTournamentJson,
  updateTournamentJsonForMatch,
  deleteTournament,
  getAllTournaments,
  updateHasStarted,
  genAndUpdateTournamentJson,
};
