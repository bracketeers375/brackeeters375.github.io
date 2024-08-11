import express from "express";
import participantsService from '../services/participantsService.js';

const getParticipantsByTourId = async (req, res) => {
    const tournament_id = parseInt(req.params.tournament_id);
    try {
        const participants = await participantsService.getParticipantsByTourId(tournament_id);
        let body = {
            "attendees": participants
        }
        return res.json(body);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while retrieving the participants list");
    }
};

const participantRouter = express.Router();
participantRouter.get("/getAll/:tournament_id", getParticipantsByTourId);

export default participantRouter;