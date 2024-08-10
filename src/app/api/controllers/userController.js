const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.APP_CONNECTION_STRING,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  res.send(`User with ID: ${id} got`);
};

exports.createUser = async (req, res) => {
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

exports.updateUser = (req, res) => {
  const { id } = req.params;
  res.send(`User with ID: ${id} updated`);
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  res.send(`User with ID: ${id} deleted`);
};
