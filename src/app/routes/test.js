import * as express from "express";
const router = express.Router();

import * as testController from "../controllers/testController";

router.get("/", testController.test);

module.exports = router;
