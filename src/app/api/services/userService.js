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

  try {
    const result = await pool.query(
      `INSERT INTO users(username, email, password_hash)
             VALUES ($1, $2, crypt($3, gen_salt('md5')))
             RETURNING *`,
      [username, email, password],
    );
    return result.rows[0];
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
      SELECT password_hash FROM Users 
      WHERE UPPER(username)=$1 `,
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

  return isCorrectPass;

};

const getUserById = async (id) => {
  // TODO
};

const updateUser = async (id, details) => {
  // TODO
};

const deleteUser = async (id) => {
  // TODO
};

export default {
  createUser,

  loginUser,
  getUserById,
  updateUser,
  deleteUser,
};
  getUserById,
  updateUser,
  deleteUser,
};
