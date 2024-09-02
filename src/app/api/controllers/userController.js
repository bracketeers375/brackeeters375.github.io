import express from "express";
import userService from "../services/userService.js";
import crypto from "crypto";

const makeToken = () => crypto.randomBytes(32).toString("hex");

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
};

const handleError = (res, message = "An internal error occurred.", statusCode = 500) => {
  console.error(message);
  res.status(statusCode).send(message);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  res.send(`User with ID: ${id} got`);
};

const getUserByToken = async (req, res) => {
  const token = req.cookies.user?.token;

  if (!token) {
    return handleError(res, "No token found", 400);
  }

  try {
    const user = await userService.getUserByToken(token);
    res.status(200).send(user);
  } catch (error) {
    handleError(res);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return handleError(res, "Missing credentials", 400);
  }

  const existingToken = req.cookies?.user?.token || req.headers.authorization?.split(' ')[1];

  try {
    const user = await userService.loginUser(username, password);

    if (!user) {
      return handleError(res, "Incorrect password", 400);
    }

    if (existingToken && user.token === existingToken) {
      console.log(`Reusing existing token ${existingToken}`);
      res.cookie("user", { token: existingToken, username: user.username }, cookieOptions).send();
      return;
    }

    const updatedUser = await updateToken(user.user_id);
    res.cookie("user", { token: updatedUser.token, username: updatedUser.username }, cookieOptions).send();
  } catch (error) {
    handleError(res, error.message);
  }
};

const logoutUser = async (req, res) => {
  const token = req.cookies.user?.token;

  if (!token) {
    return handleError(res, "No user logged in", 400);
  }

  try {
    await userService.invalidateToken(token);
    res.clearCookie("user", cookieOptions);
    res.status(200).send("Logged out successfully");
  } catch (error) {
    handleError(res, "Error logging out");
  }
};

const updateToken = async (userId) => {
  try {
    const newToken = makeToken();
    const result = await userService.updateUser(userId, { token: newToken });
    return result[0];
  } catch (error) {
    throw new Error("Error updating user token");
  }
};

const createUser = async (req, res) => {
  const { username, email, password, cpassword } = req.body;

  if (!username || !email || !password || !cpassword) {
    return handleError(res, "Missing required fields", 400);
  }

  if (password !== cpassword) {
    return handleError(res, "Password does not match", 400);
  }

  try {
    await userService.createUser(username, email, password);
    const verifiedUser = await userService.loginUser(username, password);
    const updatedUser = await updateToken(verifiedUser.user_id);

    res.cookie("user", { token: updatedUser.token, username: updatedUser.username }, cookieOptions).send();
  } catch (error) {
    if (error.message === "Username or email already exists") {
      handleError(res, error.message, 409);
    } else {
      handleError(res);
    }
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const details = req.body;

  try {
    const user = await userService.updateUser(id, details);

    if (user.length === 0) {
      return handleError(res, "Account does not exist", 404);
    }

    if (user.length > 1) {
      return handleError(res, "More than one account was found", 400);
    }

    res.status(200).send(user[0]);
  } catch (error) {
    handleError(res);
  }
};

const userRouter = express.Router();

userRouter.get("/get/:id", getUserById);
userRouter.get("/token", getUserByToken);
userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.put("/update/:id", updateUser);

export default userRouter;
