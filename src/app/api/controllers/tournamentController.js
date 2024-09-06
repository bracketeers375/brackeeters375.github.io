import express from "express";
import tournamentService from "../services/tournamentService.js";
import participantsService from "../services/participantsService.js";

const extractToken = (req) => req.cookies?.user?.token || req.headers.authorization?.split(' ')[1];

const getTournamentById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const otherThing = await tournamentService.genAndUpdateTournamentJson(id);
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

    let {t_name, g_id, e_id, h_id, t_id, registrationDeadline} = req.body;

    if(!t_name || !g_id || !e_id || !h_id || t_id) {
      return res.status(400).send("Missing required fields");
    }

    try {
      const result = await tournamentService.createTournament(t_name, g_id, e_id, h_id, t_id, registrationDeadline);
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

const updateTournamentJsonForMatch = async (req, res) => {
  let tournament_id = req.params.id;
  let {tournament_json} = req.body;
  if (!tournament_id) {
      return res.status(400).send("Missing required fields");
  }

  if(Number.isNaN(tournament_id)) {
    return res.status(400).send("Tournament ID must be a number");
  }

  try {
    const result = await tournamentService.updateTournamentJsonForMatch(tournament_id, tournament_json);
    res.status(200).send();
  } catch {
      console.log(error);
      res.status(500).send("An error occurred while creating tournament");
  }
};

const joinTournament = async (req, res) => {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).send("User must be logged in to perform this action.");
  }

  const tournamentId = parseInt(req.params.tournament_id);
  const eventId = parseInt(req.body.event_id);

  try {
    await participantsService.joinTournament(eventId, tournamentId, token);
    res.sendStatus(200);
  } catch (error) {
    switch (error.message) {
      case "No event found.":
      case "No user found.":
      case "No tournament found.":
        return res.status(404).send("User, event, or tournament not found.");
    }

    console.error(error);
    res.status(500).send("An error occurred while registering for the tournament.");
  }
};

const leaveTournament = async (req, res) => {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).send("User must be logged in to perform this action.");
  }

  const tournamentId = parseInt(req.params.tournament_id);
  const eventId = parseInt(req.body.event_id);

  try {
    await participantsService.leaveTournament(eventId, tournamentId, token);
    res.sendStatus(200);
  } catch (error) {
    switch (error.message) {
      case "No event found.":
      case "No user found.":
      case "No tournament found.":
        return res.status(404).send("User, event, or tournament not found.");
    }

    console.error(error);
    res.status(500).send("An error occurred while leaving the tournament.");
  }
};

const deleteTournament = async (req, res) => {
  res.send("Not yet implemented.");
};

const tournamentRouter = express.Router();

tournamentRouter.get("/get/:id", getTournamentById);
tournamentRouter.get("/getAllTourFromEvent/:eventid", getAllTournamentsByEventId);
tournamentRouter.post("/:tournament_id/join", joinTournament)
tournamentRouter.post("/:tournament_id/leave", leaveTournament)
tournamentRouter.post("/create", createTournament);
tournamentRouter.post("/updateJson/:id", updateTournamentJson);
tournamentRouter.post("/updateJsonForMatch/:id", updateTournamentJsonForMatch);
tournamentRouter.delete("/delete/:id", deleteTournament);

export default tournamentRouter;
