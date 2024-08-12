import pool from "./connection.js";

const getTournamentById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT Tournaments.name,
                    Games.name                  AS game_name,
                    Tournaments.start_date,
                    Tournaments.end_date,
                    Tournaments.description,
                    Organizations.name          AS org_name,
                    Organizations.contact_email AS org_email
             FROM Tournaments
                      JOIN Games on Tournaments.game_id = Games.game_id
                      JOIN Organizations on Tournaments.organization_id = Organizations.organization_id
             WHERE tournament_id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return null; // Return null if no tournament is found
    }

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
