import express from "express";
import eventsService from "../services/eventsService.js";
import userService from "../services/userService.js";

const getAllEvents = async (req, res) => {
  try {
    const events = await eventsService.getAllEvents();
    return res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving the events list");
  }
};

const getEventById = async (req, res) => {
  const eventId = parseInt(req.params.event_id);
  try {
    const event = await eventsService.getEventById(eventId);
    if (!event) {
      return res.status(404).send("Event not found");
    }
    return res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving the event");
  }
};

const getEventByTournamentId = async (req, res) => {
  const tournamentId = parseInt(req.params.tournament_id);
  try {
    const event = await eventsService.getEventByTournamentId(tournamentId);
    if (!event) {
      return res.status(404).send("Event not found for the given tournament ID");
    }
    return res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving the event by tournament ID");
  }
};

const extractToken = (req) => req.cookies?.user?.token || req.headers.authorization?.split(' ')[1];

const createEvent = async (req, res) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).send("User must be logged in to perform this action.");
  }

  const { eventName, startDate, endDate } = req.body;
  if (!eventName || !startDate) {
    return res.status(400).send("Missing one or more required fields.")
  }

  try {
    const { user_id: userId } = await userService.getUserByToken(token)
    const event = await eventsService.createEvent(eventName, startDate, endDate, userId);
    return res.status(201).json(event);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while creating this event.");
  }
};

const updateEvent = async (req, res) => {
  const eventId = parseInt(req.params.event_id);
  const details = req.body;
  try {
    const updatedEvent = await eventsService.updateEvent(eventId, details);
    if (!updatedEvent) {
      return res.status(404).send("Event not found");
    }
    return res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the event");
  }
};

const deleteEvent = async (req, res) => {
  const eventId = parseInt(req.params.event_id);
  try {
    await eventsService.deleteEvent(eventId);
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the event");
  }
};

const eventRouter = express.Router();

eventRouter.get("/getAll", getAllEvents);
eventRouter.get("/:event_id", getEventById);
eventRouter.get("/byTournament/:tournament_id", getEventByTournamentId);
eventRouter.post("/create", createEvent);
eventRouter.put("/update/:event_id", updateEvent);
eventRouter.delete("/delete/:event_id", deleteEvent);

export default eventRouter;