import express from "express";
const apiRouter = express.Router();

import userRouter from "./controllers/userController.js";
import tournamentRouter from "./controllers/tournamentController.js";
import participantRouter from "./controllers/participantsController.js";
import searchRouter from "./controllers/searchController.js";

apiRouter.use("/users", userRouter);
apiRouter.use("/tournaments", tournamentRouter);
apiRouter.use("/participants", participantRouter);
apiRouter.use("/search", searchRouter);

export default apiRouter;
