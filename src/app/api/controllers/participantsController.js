import express from "express";
import participantsService from "../services/participantsService.js";

const getParticipantsByTourId = async (req, res) => {
  const tournament_id = parseInt(req.params.tournament_id);
  try {
    const participants =
      await participantsService.getParticipantsByTourId(tournament_id);
    let body = {
      attendees: participants,
    };
    return res.json(body);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("An error occurred while retrieving the participants list");
  }
};

const addParticipantToEvent = async (req, res) => {
  let args = req.body;
  console.log(args);

  try {
    await participantsService.addParticipantToEvent(
      args.user_id,
      args.username,
      args.event_id,
      args.tourn_id,
      args.game_id,
      args.game_name,
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const participantRouter = express.Router();
participantRouter.get("/getAll/:tournament_id", getParticipantsByTourId);
participantRouter.post("/add/:event_id", addParticipantToEvent);

export default participantRouter;
