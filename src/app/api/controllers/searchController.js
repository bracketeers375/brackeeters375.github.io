import express from "express";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import searchService from "../services/searchService.js";
=======
import participantsService from '../services/searchService.js';
>>>>>>> aaffe15 (organized/routed search)
=======
import participantsService from "../services/searchService.js";
>>>>>>> afe8be9 (prettier run)
=======
import searchService from "../services/searchService.js";
>>>>>>> 51c3f41 (syntax error fix)
=======
import participantsService from '../services/searchService.js';
>>>>>>> d52024f (organized/routed search)
=======
import participantsService from "../services/searchService.js";
>>>>>>> 60f8ecf (prettier run)

const searchTournamentsByName = async (req, res) => {
  const name = req.query.name;

  try {
    const result = await searchService.getTournamentByName(name);
    let body = {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      tourneys: results,
    };
    return res.json(body);
=======
=======
>>>>>>> d52024f (organized/routed search)
      "tourneys": results
    }
    return res.json(body);

<<<<<<< HEAD
>>>>>>> aaffe15 (organized/routed search)
=======
      tourneys: results,
    };
    return res.json(body);
>>>>>>> afe8be9 (prettier run)
=======
>>>>>>> d52024f (organized/routed search)
=======
      tourneys: results,
    };
    return res.json(body);
>>>>>>> 60f8ecf (prettier run)
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while searching for tournaments.");
  }
};

const searchRouter = express.Router();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
searchRouter.get("/getAll/:name", getTournamentByName);
=======
searchRouter.get("/getAll/:name", getTournamentByName)
>>>>>>> aaffe15 (organized/routed search)
=======
searchRouter.get("/getAll/:name", getTournamentByName);
>>>>>>> afe8be9 (prettier run)
=======
searchRouter.get("/getAll/:name", getTournamentByName)
>>>>>>> d52024f (organized/routed search)
=======
searchRouter.get("/getAll/:name", getTournamentByName);
>>>>>>> 60f8ecf (prettier run)

export default searchRouter;
