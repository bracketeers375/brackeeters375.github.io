import express from "express";
import userService from '../services/userService.js';

const getUserById = async (req, res) => {
  const { id } = req.params;
  res.send(`User with ID: ${id} got`);
};

const createUser = async (req, res) => {
  const { username, email, cemail, password, cpassword } = req.body;

  if (!username || !email || !cemail || !password || !cpassword) {
    return res.status(400).send("Missing required fields");
  }

  if (email.toLowerCase() !== cemail.toLowerCase()) {
    return res.status(400).send("Email does not match");
  }

  if (password !== cpassword) {
    return res.status(400).send("Password does not match");
  }

  try {
    await userService.createUser(username, email, password);
    return res.sendStatus(201);
  } catch (error) {
    switch (error.message) {
      case "Username or email already exists":
        return res.status(409).send("Username or email already exists");
      default:
        return res.sendStatus(500);
    }
  }
};

const updateUser = (req, res) => {
  const { id } = req.params;
  res.send(`User with ID: ${id} updated`);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  res.send(`User with ID: ${id} deleted`);
};

const userRouter = express.Router();

userRouter.get("/get/:id", getUserById);
userRouter.post("/create", createUser);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;
