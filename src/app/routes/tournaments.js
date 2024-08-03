const express = require('express');
const router = express.Router();

const tournamentController = require('../controllers/tournamentController');

router.get('/getAll', tournamentController.getAllTournaments);
router.get('/get/:id', tournamentController.getTournamentById);
router.post('/create', tournamentController.createTournament);
router.put('/update/:id', tournamentController.updateTournament);
router.delete('/delete/:id', tournamentController.deleteTournament);

module.exports = router;