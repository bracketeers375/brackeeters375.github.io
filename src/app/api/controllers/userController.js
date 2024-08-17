import express from "express";
import userService from "../services/userService.js";
import crypto from "crypto";

let tokenStorage = {};
function makeToken() {
  return crypto.randomBytes(32).toString("hex");
}

let cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
};


const getUserById = async (req, res) => {
  const { id } = req.params;
  res.send(`User with ID: ${id} got`);
};

const loginUser = async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Missing features");
  }

  try {
    let result = await userService.loginUser(username, password);
    if (result) {
      for (let [key, val] of Object.entries(tokenStorage)) {
        if (val === username.toUpperCase()) {
          console.log("Related token", key);
          return res.cookie("token", key, cookieOptions).send();
        }
      }

      let token = makeToken();
      console.log("Generated token", token);
      tokenStorage[token] = username.toUpperCase();
      return res.cookie("token", token, cookieOptions).send();
    }
    return res.status(400).send("Incorrect password");
  } catch (error) {
    console.log(error);
  }
};


const createUser = async (req, res) => {
  const { username, email, password, cpassword } = req.body;

  if (!username || !email || !password || !cpassword) {
    return res.status(400).send("Missing required fields");
  }

  if (password !== cpassword) {
    return res.status(400).send("Password does not match");
  }

  try {
    await userService.createUser(username, email, password);
    let token = makeToken();
    console.log("Generated token", token);
    tokenStorage[token] = username.toUpperCase();
    return res.cookie("token", token, cookieOptions).send();
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
userRouter.post("/login", loginUser);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;