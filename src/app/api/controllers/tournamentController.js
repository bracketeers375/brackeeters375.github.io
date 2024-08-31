import express from "express";
import tournamentService from "../services/tournamentService.js";

const getTournamentById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const tournament = await tournamentService.getTournamentById(id);

    if (!tournament) {
      return res.status(404).send("Tournament not found");
    }

    return res.json(tournament);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while retrieving the tournament");
  }
};

const getAllTournamentsByEventId = async (req, res) => {
  try {
    const event_id = parseInt(req.params.eventid);
    
    if (Number.isNaN(event_id)) {
      return res.status(400).send("Event ID must be a number");
    }

      const tournaments = await tournamentService.getAllTournamentsByEventId(event_id);
      console.log("tournament: ", tournaments);
      return res.json(tournaments);
  } catch (error) {
     console.log(error);
    res.status(500).send("An error occurred while retrieving tournaments");
  }

};

const createTournament = async (req, res) => {

    let {t_name, g_id, e_id} = req.body;

    if(!t_name || !g_id || !e_id) {
      return res.status(400).send("Missing required fields");
    }

    try {
      const result = await tournamentService.createTournament(t_name, g_id, e_id);
      console.log("result:", result);
      res.status(200).send();
    } catch {
      console.log(error);
      res.status(500).send("An error occurred while creating tournament");
    }
  
};

const updateTournamentJson = async (req, res) => {
  let tournament_id = req.params.id;
  let {tournament_json} = req.body;
  if (!tournament_id) {
      return res.status(400).send("Missing required fields");
  }

  if(Number.isNaN(tournament_id)) {
    return res.status(400).send("Tournament ID must be a number");
  }

  try {
    const result = await tournamentService.updateTournamentJson(tournament_id, tournament_json);
    res.status(200).send();
  } catch {
      console.log(error);
      res.status(500).send("An error occurred while creating tournament");
  }
};

const deleteTournament = async (req, res) => {
  res.send("Not yet implemented.");
};

const tournamentRouter = express.Router();

tournamentRouter.get("/get/:id", getTournamentById);
tournamentRouter.get("/getAllTourFromEvent/:eventid", getAllTournamentsByEventId);
tournamentRouter.post("/create", createTournament);
tournamentRouter.post("/updateJson/:id", updateTournamentJson);
tournamentRouter.delete("/delete/:id", deleteTournament);

export default tournamentRouter;
