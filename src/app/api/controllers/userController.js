import express from "express";
import userService from "../services/userService.js";
import crypto from "crypto";

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

const getUserByToken = async (req, res) => {
  let token = req.cookies.token;
  try{
    let user = await userService.getUserByToken(token);
    if(user.length === 0)
      return res.status(404).send("Account does not exist or no token was found");

    if(user.length > 1)
      return res.status(400).send("Duplicate token");
    
    return res.status(200).send(user[0]);
  }catch(error){
    console.log(error);
    res.status(500).send("Database error");
  }
  
}

const loginUser = async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Missing features");
  }
  
  try {
    let user = await userService.loginUser(username, password);
    if (user) {
      if(user.token){
        console.log(`Preexisting token ${user.token}`);
        return res.cookie("token", user.token, cookieOptions).send();
      }

      return res.status(404).send("No token found on account");
    }
    return res.status(400).send("Incorrect password");
  } catch (error) {
    return res.send(error);
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
  } catch (error) {
    
    switch (error.message) {
      case "Username or email already exists":
        return res.status(409).send("Username or email already exists");
      default:
        return res.status(500).send(error.message);
    }
  }
  let verifiedUser;
 	try{
    verifiedUser = await userService.loginUser(username, password);
 	}catch(error){
    console.log(error);
    return res.send(error);
  }


  try{
    let result = await userService.updateUser(verifiedUser.user_id, {token: makeToken()});
    let updatedUser = result[0];
    console.log(`Generated token ${updatedUser.token}`);
    return res.cookie("token", updatedUser.token, cookieOptions).send();
  }catch(error){
    console.log(error);
    return res.send(error);
  }
  
};

const updateUser = async (req, res) => {
  const id  = req.params.id;
  const details = req.body;
  try{
    let user = await userService.updateUser(id, details);
    if(user.length == 0)
      return res.status(404).send("Account does not exist");

    if(user.length > 1)
      return res.status(400).send("More than one account was found");

    return res.status(200).send(user[0]);
  }catch(error){
    res.status(500).send("Database error");
  }
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  res.send(`User with ID: ${id} deleted`);
};

const userRouter = express.Router();

userRouter.get("/get/:id", getUserById);
userRouter.get("/token", getUserByToken);
userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;