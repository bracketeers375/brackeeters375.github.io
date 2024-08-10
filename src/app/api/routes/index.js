const express = require("express");
const router = express.Router();

const userRoutes = require("./users");
router.use("/users", userRoutes);
const tournamentRoutes = require("./tournaments");
router.use("/tournaments", tournamentRoutes);

module.exports = router;
