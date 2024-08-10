const express = require("express");
const router = express.Router();

router.use("/users", require("./controllers/userController"));
router.use("/tournaments", require("./controllers/tournamentController"));

module.exports = router;
