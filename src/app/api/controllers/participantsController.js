import express from "express";
import participantsService from "../services/participantsService.js";


const getParticipantsByEventId = async (req, res) => {
  const event_id = parseInt(req.params.event_id);
  try {
    const participants =
      await participantsService.getParticipantsByEventId(event_id);
      console.log("participants RAW", participants)
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

const getParticipantsByEventIdFormatted = async (req, res) => {
  const event_id = parseInt(req.params.event_id);
  try {
    const participants =
      await participantsService.getParticipantsByEventIdFormatted(event_id);
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

const addParticipant2Tournament = async (req, res) => {
  let args = req.body;
  console.log(args);

  try {
    await participantsService.addParticipant2Tournament(
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

const removeParticipantFromTour = async (req, res) => {
  let participants_id = req.params.participants_id;
  try {

    if(Number.isNaN(participants_id)) {
      return res.status(400).send("Participants ID must be a number")
    }

    await participantsService.removeParticipantFromTour(participants_id);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }


};

const seedParticipant = async (req, res) => {
  let id = req.params.participant_id;
  let seed = req.body.seed;

  if(!id || !seed)
    return res.status(400).send("Missing features");

  if(Number(id) != NaN && seed < 1)
    return res.status(400).send("Seed cannot be less than 1");
  
  
  try{
  	let result = await participantsService.seedParticipant(id, seed);
    if(!result)
      return res.status(404).send("Error seeding participant");
    return result;
  }catch(error){
    return res.send(error);
  }
}

const participantRouter = express.Router();
participantRouter.get("/getByTour/:tournament_id", getParticipantsByTourId);
participantRouter.get("/getByEvent/:event_id", getParticipantsByEventId);
participantRouter.get("/getByEventFormatted/:event_id", getParticipantsByEventIdFormatted);
participantRouter.post("/add/:tournament_id", addParticipant2Tournament);
participantRouter.post("/remove/:participants_id", removeParticipantFromTour);
participantRouter.post("/seed/:participant_id", seedParticipant);

export default participantRouter;
