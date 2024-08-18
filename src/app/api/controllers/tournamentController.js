import express from "express";
import tournamentService from "../services/tournamentService.js";

const getAllTournaments = async (req, res) => {
  res.send("Not yet implemented.");
};

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

const createTournament = async (req, res) => {
  res.send("Not yet implemented.");
};

const updateTournament = async (req, res) => {
  res.send("Not yet implemented.");
};

const deleteTournament = async (req, res) => {
  res.send("Not yet implemented.");
};

const tournamentRouter = express.Router();

tournamentRouter.get("/getAll", getAllTournaments);
tournamentRouter.get("/get/:id", getTournamentById);
tournamentRouter.post("/create", createTournament);
tournamentRouter.put("/update/:id", updateTournament);
tournamentRouter.delete("/delete/:id", deleteTournament);

export default tournamentRouter;
