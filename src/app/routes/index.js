const express = require("express");
const router = express.Router();

const testRoutes = require("./test");
router.use("/test", testRoutes);
const userRoutes = require("./users");
router.use("/users", userRoutes);
const tournamentRoutes = require("./tournaments");
router.use("/tournaments", tournamentRoutes);

module.exports = router;
