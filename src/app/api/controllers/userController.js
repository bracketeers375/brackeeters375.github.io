const { pool } = require('../../connection');

const getUserById = async (req, res) => {
  const { id } = req.params;
  res.send(`User with ID: ${id} got`);
};

const createUser = async (req, res) => {
  let body = req.body;
  let username;
  let email;
  let cemail;
  let password;
  let cpassword;

  if (
    !body.hasOwnProperty("username") ||
    !body.hasOwnProperty("email") ||
    !body.hasOwnProperty("cemail") ||
    !body.hasOwnProperty("password") ||
    !body.hasOwnProperty("cpassword")
  ) {
    res.status(400);
    return res.send();
  }

  username = body.username;
  email = body.email;
  cemail = body.cemail;
  password = body.password;
  cpassword = body.cpassword;

  if (email.toLowerCase() !== cemail.toLowerCase()) {
    res.status(400);
    return res.json({ error: "Email does not match" });
  }

  if (password !== cpassword) {
    res.status(400);
    return res.json({ error: "Password does not match" });
  }

  try {
    await pool
      .query(
        `INSERT INTO users(username, email, password_hash)
             VALUES ($1, $2, crypt($3, gen_salt('md5')))
             RETURNING *`,
        [username, email, password],
      )
      .then(() => {
        return res.sendStatus(200);
      });
  } catch (error) {
    console.log(error);
    return res.sendStatus(error.status);
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

const express = require("express");
const userRouter = express.Router();

userRouter.get("/get/:id", getUserById);
userRouter.post("/create", createUser);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);

module.exports = userRouter;
