import * as express from "express";
const router = express.Router();

import * as tournamentController from "../controllers/tournamentController";

router.get("/getAll", tournamentController.getAllTournaments);
router.get("/get/:id", tournamentController.getTournamentById);
router.post("/create", tournamentController.createTournament);
router.put("/update/:id", tournamentController.updateTournament);
router.delete("/delete/:id", tournamentController.deleteTournament);

module.exports = router;
