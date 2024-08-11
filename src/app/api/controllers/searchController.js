import express from "express";
<<<<<<< HEAD
<<<<<<< HEAD
import searchService from "../services/searchService.js";
=======
import participantsService from '../services/searchService.js';
>>>>>>> aaffe15 (organized/routed search)
=======
import participantsService from "../services/searchService.js";
>>>>>>> afe8be9 (prettier run)

const searchTournamentsByName = async (req, res) => {
  const name = req.query.name;

  try {
    const result = await searchService.getTournamentByName(name);
    let body = {
<<<<<<< HEAD
<<<<<<< HEAD
      tourneys: results,
    };
    return res.json(body);
=======
      "tourneys": results
    }
    return res.json(body);

>>>>>>> aaffe15 (organized/routed search)
=======
      tourneys: results,
    };
    return res.json(body);
>>>>>>> afe8be9 (prettier run)
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while searching for tournaments.");
  }
};

const searchRouter = express.Router();
<<<<<<< HEAD
<<<<<<< HEAD
searchRouter.get("/getAll/:name", getTournamentByName);
=======
searchRouter.get("/getAll/:name", getTournamentByName)
>>>>>>> aaffe15 (organized/routed search)
=======
searchRouter.get("/getAll/:name", getTournamentByName);
>>>>>>> afe8be9 (prettier run)

export default searchRouter;
