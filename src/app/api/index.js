import express from "express";
const apiRouter = express.Router();

import userRouter from "./controllers/userController.js";
import tournamentRouter from "./controllers/tournamentController.js";
import bracketsRouter from "./controllers/bracketsController.js";
import searchRouter from "./controllers/searchController.js";
import eventRouter from "./controllers/eventsController.js";

apiRouter.use("/users", userRouter);
apiRouter.use("/tournaments", tournamentRouter);
apiRouter.use("/search", searchRouter);
apiRouter.use("/brackets", bracketsRouter);
apiRouter.use("/events", eventRouter);

export default apiRouter;
