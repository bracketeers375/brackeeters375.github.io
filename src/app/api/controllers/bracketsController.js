import express from "express";
import bracketsService from "../services/bracketsService.js";

const createBracket = async (req, res) => {
    const { numPlayers, format } = req.body;
    
    if(!numPlayers || !format) {
        return res.status(400).send("Missing required fields");
    }


};

const bracketsRouter = express.Router();

bracketsRouter.get("/get/:id", getBracketById);
bracketsRouter.post("/create", createBracket);
bracketsRouter.put("/update/:id", updateBracket);
bracketsRouter.delete("/delete/:id", deleteBracket);


export default bracketsRouter;
