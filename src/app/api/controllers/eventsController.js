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

const getDetails = async (req, res) => {
  let { eventName } = req.body;
  if (!eventName) {
      return res.status(400).send("Missing parameter");
  }

  try {
      await eventsService.createEvent(eventName);
      res.status(200).send("Event created successfully");
  } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
  }
}

const updateDetails = async (req, res) => {
  let { eventName, updatedEventName } = req.body;
  if (!eventName || !updatedEventName) {
      return res.status(400).send("Missing parameters");
  }

  try {
      await eventsService.updateEvent(eventName, updatedEventName);
      res.status(200).send("Event updated successfully");
  } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
  }
}

const deleteDetails = async (req, res) => {
  let { deleteEvent } = req.body;
  if (!deleteEvent) {
      return res.status(400).send("Missing parameter");
  }

  try {
      await eventsService.deleteEvent(deleteEvent);
      res.status(200).send("Event deleted successfully");
  } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
  }
}

const eventRouter = express.Router();

eventRouter.get("/get/:id", getEventById);
eventRouter.get("/getAll/:id", getAllEventsByTournamentId);
eventsRouter.delete("/delete", deleteDetails); 
eventsRouter.post("/update", updateDetails);
eventsRouter.post("/create", getDetails);

export default eventRouter;
