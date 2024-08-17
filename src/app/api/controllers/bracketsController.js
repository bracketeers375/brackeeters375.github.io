import express from "express";
import bracketsService from "../services/bracketsService.js";

const createBracketTest = async (req, res) => {
    console.log("test 123")
    const { numPlayers, format } = req.body;
    
    if(!numPlayers || !format) {
        return res.status(400).send("Missing required fields");
    }

    try {
        const tournamentJsonData = await bracketsService.createBracketTest(numPlayers, format);
        let body = {
            tournamentData: tournamentJsonData,
        };
        return res.json(body);
    }   catch (error) {
        res.status(500);
        res.send("An error occured while creating bracket");
    }

};

const bracketsRouter = express.Router();

// bracketsRouter.get("/get/:id", getBracketById);
bracketsRouter.post("/createTest", createBracketTest);
// bracketsRouter.put("/update/:id", updateBracket);
// bracketsRouter.delete("/delete/:id", deleteBracket);


export default bracketsRouter;
