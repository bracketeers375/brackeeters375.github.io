import pool from "./connection.js";
import argon2 from "argon2";

const createUser = async (username, email, password) => {
  let hash;
  try {
    hash = await argon2.hash(password);
  } catch (error) {
    console.log(error);
    throw new Error("HASH FAILED");
  }
  try {
    await pool.query(
      `INSERT INTO users(username, email, password_hash)
             VALUES ($1, $2, $3)
             RETURNING *`,
      [username, email, hash],
    );
  } catch (error) {
    switch (error.code) {
      case "23505": // i.e. Duplicate key constraint violated
        throw new Error("Username or email already exists");
      default:
        console.log(error);
        throw new Error("Database error");
    }
  }
};

const loginUser = async (username, password) => {
  let result;
  try {
    result = await pool.query(
      `
      SELECT * FROM Users 
      WHERE UPPER(username)=$1`,
      [username.toUpperCase()],
    );
  } catch (error) {
    console.log(error);
    throw new Error("SELECT FAILED");
  }

  let users = result.rows;
  if (users.length > 1) {
    throw new Error("Name already exists");
  }

  if (users.length == 0) {
    throw new Error("Account does not exist");
  }

  let user = users[0];
  let hash = user.password_hash;
  let isCorrectPass;
  try {
    isCorrectPass = await argon2.verify(hash, password);
  } catch (error) {
    console.log(error);
    throw new Error("Verification failed");
  }

  return isCorrectPass ? user : undefined;
};

const getUserByToken = async (token) => {
  if (token === undefined) throw new Error("No token for this site");

  try {
    let result = await pool.query(
      `SELECT *
      FROM Users
      WHERE token=$1`,
      [token],
    );
    return result.rows;
  } catch (error) {
    throw new Error("Problem querying database");
  }
};

const getUserById = async (id) => {
  // TODO
};

const updateUser = async (id, details) => {
  let queryString = "UPDATE Users SET ";
  if (!details) throw new Error("No details provided");

  let paramNumber = 1;

  let args = [];
  if (details.hasOwnProperty("username")) {
    queryString += `username= \$${paramNumber}, `;
    args.push(details.username);
    paramNumber++;
  }

  if (details.hasOwnProperty("email")) {
    queryString += `email= \$${paramNumber}, `;
    args.push(details.email);
    paramNumber++;
  }

  if (details.hasOwnProperty("full_name")) {
    queryString += `full_name= \$${paramNumber}, `;
    args.push(details.full_name);
    paramNumber++;
  }

  if (details.hasOwnProperty("token")) {
    queryString += `token= \$${paramNumber}`;
    args.push(details.token);
    paramNumber++;
  }

  queryString += ` WHERE user_id= \$${paramNumber} RETURNING *`;
  args.push(parseInt(id));

  try {
    console.log(queryString);
    console.log(args);
    let result = await pool.query(queryString, args);
    console.log("Success");
    return result.rows;
  } catch (error) {
    console.log("Could not query database");
  }
};

const deleteUser = async (id) => {
  // TODO
};

export default {
  createUser,
  loginUser,
  getUserById,
  getUserByToken,
  updateUser,
  deleteUser,
};
