import express from "express";
import participantsService from '../services/searchService.js';

const searchTournamentsByName = async (req, res) => {
  const name = req.query.name;

  try {
    const result = await searchService.getTournamentByName(name);
    let body = {
      "tourneys": results
    }
    return res.json(body);

  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while searching for tournaments.");
  }
};

const searchRouter = express.Router();
searchRouter.get("/getAll/:name", getTournamentByName)

export default searchRouter;
