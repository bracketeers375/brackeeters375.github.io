import express from "express";
import eventsService from "../services/eventsService.js";

const getEventById = async (req, res) => {
  let id = req.params.id;
  try {
    let event = await eventsService.getEventById(id);

    if (event.length > 1)
      return res.status(500).send("Too many events retrieved");

    if (event.length === 0) return res.status(400).send("Event does not exist");

    return res.json(event[0]);
  } catch (error) {
    return res.status(500).send("Could not retrieve event");
  }
};

const getAllEventsByTournamentId = async (req, res) => {
  let id = req.params.id;
  try {
    let events = await eventsService.getAllEventsByTournamentId(id);

    if (events.length === 0)
      return res.status(400).send("Tournament does not have events");

    return res.send(events);
  } catch (error) {
    return res.status(500).send("Could not retrieve events");
  }
};

const eventRouter = express.Router();

eventRouter.get("/get/:id", getEventById);
eventRouter.get("/getAll/:id", getAllEventsByTournamentId);

export default eventRouter;
