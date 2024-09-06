import express from "express";
import gamesService from "../services/gamesService.js"; // Make sure the path is correct

// Controller: Fetch all games
const getGames = async (req, res) => {
  try {
    const games = await gamesService.getAllGames();  // Fix the typo (gamesService)
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving games' });
  }
};

const gamesRouter = express.Router();

// Define the route
gamesRouter.get("/getAll/:name", getGames);  // Attach the getGames handler

// Export the router
export default gamesRouter;
