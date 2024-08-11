import express from "express";
import tournamentService from "../services/tournamentService.js";

const getAllTournaments = async (req, res) => {
    res.send("Not yet implemented.");
};

const getTournamentById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const tournament = await tournamentService.getTournamentById(id);

        if (!tournament) {
            return res.status(404).send("Tournament not found");
        }

        const { name, game_name, org_name, org_email, start_date, end_date, description } = tournament;

        return res.send(
            `<!DOCTYPE html>
         <html>
           <head>
             <title>${name}</title>
           </head>
           <body>
             <h1>${name}</h1>
             <h3>Hosted by: ${org_name} - ${org_email}</h3>
             <h3>${new Date(start_date).toDateString()} - ${new Date(end_date).toDateString()}</h3>
             <h3>Game: ${game_name}</h3>
             <div>
               <h4>Description:</h4>
               <p>${description}</p>
             </div>
             <p><a href=\"../../..\" id=\"test\">Home page</a></p>
             <p><a>Registration</a></p>
             <p><a>Brackets</a></p>
             <script>
               let a = document.getElementById(\"test\");
               a.href = a.href.replace(\"/api/\", \"\");
             </script>
           </body>
         </html>`
        );
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while retrieving the tournament");
    }
};

const createTournament = async (req, res) => {
    res.send("Not yet implemented.");
};

const updateTournament = async (req, res) => {
    res.send("Not yet implemented.");
};

const deleteTournament = async (req, res) => {
    res.send("Not yet implemented.");
};

const tournamentRouter = express.Router();

tournamentRouter.get("/getAll", getAllTournaments);
tournamentRouter.get("/get/:id", getTournamentById);
tournamentRouter.post("/create", createTournament);
tournamentRouter.put("/update/:id", updateTournament);
tournamentRouter.delete("/delete/:id", deleteTournament);

export default tournamentRouter;