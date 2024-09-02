import pool from "./connection.js";
import argon2 from "argon2";

const handleDatabaseError = (error, customMessage) => {
  console.error(customMessage, error);
  throw new Error(customMessage || "Database error");
};

const createUser = async (username, email, password) => {
  try {
    const hash = await argon2.hash(password);
    const query = `
      INSERT INTO users(username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING *`;
    const values = [username, email, hash];

    await pool.query(query, values);
  } catch (error) {
    if (error.code === "23505") {
      throw new Error("Username or email already exists");
    }
    handleDatabaseError(error, "Error creating user");
  }
};

const loginUser = async (username, password) => {
  try {
    const query = `
      SELECT * FROM Users 
      WHERE UPPER(username) = $1`;
    const values = [username.toUpperCase()];
    const result = await pool.query(query, values);
    const user = result.rows[0];

    if (!user) {
      throw new Error("Account does not exist");
    }

    const isCorrectPass = await argon2.verify(user.password_hash, password);

    if (!isCorrectPass) {
      return undefined;
    }

    return user;
  } catch (error) {
    handleDatabaseError(error, "Login failed");
  }
};

const invalidateToken = async (token) => {
  try {
    const query = `
      UPDATE Users 
      SET token = NULL 
      WHERE token = $1`;
    await pool.query(query, [token]);
  } catch (error) {
    handleDatabaseError(error, "Error invalidating token");
  }
};

const getUserByToken = async (token) => {
  if (!token) {
    throw new Error("No token provided for this site");
  }

  try {
    const query = `
      SELECT user_id, username, email 
      FROM Users 
      WHERE token = $1`;
    const result = await pool.query(query, [token]);

    if (result.rows.length === 0) {
      return null;
    }

    if (result.rows.length > 1) {
      throw new Error("Non-unique result: multiple users found with the same token.");
    }

    return result.rows[0];
  } catch (error) {
    handleDatabaseError(error, "Problem querying database");
  }
};

const updateUser = async (id, details) => {
  if (!details || Object.keys(details).length === 0) {
    throw new Error("No details provided");
  }

  const fields = [];
  const values = [];
  let paramNumber = 1;

  Object.keys(details).forEach((key) => {
    fields.push(`${key} = $${paramNumber}`);
    values.push(details[key]);
    paramNumber++;
  });

  const query = `
    UPDATE Users 
    SET ${fields.join(", ")} 
    WHERE user_id = $${paramNumber} 
    RETURNING *`;
  values.push(parseInt(id));

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      throw new Error("Account does not exist");
    }
    return result.rows;
  } catch (error) {
    handleDatabaseError(error, "Could not update user");
  }
};

const getUserById = async (id) => {
  throw new Error("Not implemented");
};


export default {
  createUser,
  loginUser,
  invalidateToken,
  getUserById,
  getUserByToken,
  updateUser,
};
