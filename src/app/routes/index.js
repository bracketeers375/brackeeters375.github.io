import * as express from "express"
const router = express.Router();

import * as testRoutes from "./test";
router.use("/test", testRoutes);

import * as userRoutes from "./users";
router.use("/users", userRoutes);
import * as tournamentRoutes from "./tournaments";
router.use("/tournaments", tournamentRoutes);

module.exports = router;
