import express from "express";
import searchService from "../services/searchService.js";
import tournamentService from "../services/tournamentService.js";

const searchByName = async (req, res) => {
  const name = req.params.name; // Use req.params to get the route parameter

  try {
    const tournaments = await tournamentService.getTournamentsByName(name);
    const games = await searchService.getGamesByName(name);
    let body = {
      tourneys: tournaments || [], // Use the variable name `result`
      games: games || [],
    };
    return res.json(body);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while searching for tournaments.");
  }
};

const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await searchService.getAllTournaments();
    console.log("tournament: ", tournaments);
    let body = {
      tourneys: tournaments || [],
      games: [],
    };
    return res.json(body);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching all tournaments.");
  }
};

const searchRouter = express.Router();
searchRouter.get("/getAll/:name", searchByName);
searchRouter.get("/all", getAllTournaments);

export default searchRouter;
