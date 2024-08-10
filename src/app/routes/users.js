import * as express from "express";
const router = express.Router();

import * as userController from "../controllers/userController";

router.get("/get/:id", userController.getUserById);
router.post("/create", userController.createUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
