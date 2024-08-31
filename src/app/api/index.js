import express from "express";
const apiRouter = express.Router();

import userRouter from "./controllers/userController.js";
import tournamentRouter from "./controllers/tournamentController.js";
import participantRouter from "./controllers/participantsController.js";
import bracketsRouter from "./controllers/bracketsController.js";
import searchRouter from "./controllers/searchController.js";
import eventRouter from "./controllers/eventsController.js";
import adminRouter from "./controllers/adminsController.js";

apiRouter.use("/users", userRouter);
apiRouter.use("/tournaments", tournamentRouter);
apiRouter.use("/participants", participantRouter);
apiRouter.use("/search", searchRouter);
apiRouter.use("/brackets", bracketsRouter);
apiRouter.use("/events", eventRouter);
apiRouter.use("/admins", adminRouter);

export default apiRouter;
