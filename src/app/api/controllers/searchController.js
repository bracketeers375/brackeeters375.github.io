import express from "express";
<<<<<<< HEAD
import searchService from "../services/searchService.js";
=======
import participantsService from '../services/searchService.js';
>>>>>>> aaffe15 (organized/routed search)

const searchTournamentsByName = async (req, res) => {
  const name = req.query.name;

  try {
    const result = await searchService.getTournamentByName(name);
    let body = {
<<<<<<< HEAD
      tourneys: results,
    };
    return res.json(body);
=======
      "tourneys": results
    }
    return res.json(body);

>>>>>>> aaffe15 (organized/routed search)
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while searching for tournaments.");
  }
};

const searchRouter = express.Router();
<<<<<<< HEAD
searchRouter.get("/getAll/:name", getTournamentByName);
=======
searchRouter.get("/getAll/:name", getTournamentByName)
>>>>>>> aaffe15 (organized/routed search)

export default searchRouter;
