const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

// Sentences SQL
const _getAll =
  "select user_info.username, user_info.nationality  ,user_info.description , languages.language_name , language_level.levels, user_info.id" +
  "from user_info" +
  "join language_offered on user_info.id = language_offered.username" +
  "join languages on language_offered.language_id = languages.id" +
  "join language_level on language_offered.user_level = language_level.id;";
const _getById = "SELECT * FROM user_info where id = $1";
const insertUser =
  "INSERT INTO user_info (username, email, password, full_name, date_of_birth, gender, nationality, description) VALUES ($1 ,$2 ,$3 , $4, $5, $6, $7, $8) RETURNING *";

const getAll = async (req, res) => {
  try {
    await pool.query(_getAll, (error, result) => {
      res.json(result.rows);
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      "SELECT * FROM user_info WHERE id = $1",
      [id],
      (error, result) => {
        if (result.rows.length === 0) {
          return res.status(404).json({ message: "User not exits!!" });
        }
        res.json(result.rows[0]);
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const createUser = async (req, res) => {
  const {
    username,
    email,
    password,
    full_name,
    date_of_birth,
    gender,
    nationality,
    description,
  } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(insertUser, [
      username,
      email,
      bcryptPassword,
      full_name,
      date_of_birth,
      gender,
      nationality,
      description,
    ]);

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (error) {
    console.error(error.message);
    res.status(400).json(`this ${username} already exist!`);
  }
};

const sign_in = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(email);
  console.log(password);
  const logIn = "SELECT * FROM user_info WHERE email = $1 and password = $2";
  pool.query(logIn, [email, password], (error, result) => {
    if (result.rows.length === 0) {
      return res.status(400).send("User doesn't exist");
    } else if (
      (result.rows[0].email === email) &
      (result.rows[0].password === password)
    ) {
      return res.status(200).send("Success");
    } else return res.status(400).send("Incorrect credentials");
  });
};

module.exports = {
  getAll,
  getById,
  createUser,
  sign_in,
};
