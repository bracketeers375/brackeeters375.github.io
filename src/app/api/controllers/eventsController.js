import express from "express";
import eventsService from "../services/eventsService.js";

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

const eventsRouter = express.Router();

eventsRouter.delete("/delete", deleteDetails); 

eventsRouter.post("/update", updateDetails);

eventsRouter.post("/create", getDetails);

export default eventsRouter;
