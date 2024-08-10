import express from "express";
const apiRouter = express.Router();

import userRouter from "./controllers/userController.js";
import tournamentRouter from "./controllers/tournamentController.js";

apiRouter.use("/users", userRouter);
apiRouter.use("/tournaments", tournamentRouter);

export default apiRouter;