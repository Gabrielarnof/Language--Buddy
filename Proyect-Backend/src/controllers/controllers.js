const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const nodemailer = require("nodemailer");

// Sentences SQL
const _getAll = "SELECT * FROM user_info";
const _getById = "SELECT * FROM user_info where id = $1";
const insertUser =
  "INSERT INTO user_info (username, email, password, full_name, date_of_birth, gender, nationality, language, language_level, description) VALUES ($1 ,$2 ,$3 , $4, $5, $6, $7, $8, $9, $10) RETURNING *";

const getAll = async (req, res) => {
  try {
    await pool.query("SELECT * FROM user_info", (error, result) => {
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
    language,
    language_level,
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
      language,
      language_level,
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
  const { email, password } = req.body;
  console.log(email, password);
};

// const emailRequest = async (req, res) => {
//   const email = req.body.email;
//   const getEmail = "SELECT email FROM user_info WHERE id = 3";
//   const result = pool.query(getEmail, [email], (error, result));
//   const userEmail = result.rows[0].email;
// };

// const transporter = nodemailer.createTransport({
//   service: "Hotmail",
//   auth: {
//     user: "migue.desimone@hotmail.com",
//     pass: "Desimone98",
//   },
// });

const buddyRequest = async (req, res) => {
  pool.query("SELECT email FROM user_info WHERE id = 3", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "agafarno@hotmail.com",
        pass: "11",
      },
    });

    res.rows.forEach((rows) => {
      transporter.sendMail(
        {
          from: "agafarno@hotmail.com",
          to: rows.email,
          subject: "You have a match request in Language Buddy",
          text: "We are happy to inform you that you have a match request to became a Language Buddy . Click here to see their request",
        },
        (err, info) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Email sent to ${row.email}: ${info.response}`);
          }
        }
      );
    });
  });
};
const buddyAccepted = async (req, res) => {
  pool.query("SELECT email FROM user_info WHERE id = 3", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "agafarno@hotmail.com",
        pass: "11",
      },
    });

    res.rows.forEach((rows) => {
      transporter.sendMail(
        {
          from: "agafarno@hotmail.com",
          to: rows.email,
          subject: "You have a Language Buddy",
          text: "We are happy to inform that your match request was accepted. Click here to get in contact with your new Buddy",
        },
        (err, info) => {
          y;
          if (err) {
            console.error(err);
          } else {
            console.log(`Email sent to ${row.email}: ${info.response}`);
          }
        }
      );
    });
  });
};

const buddyRejected = async (req, res) => {
  pool.query("SELECT email FROM user_info WHERE id = 1", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "agafarno@hotmail.com",
        pass: "11",
      },
    });

    res.rows.forEach((rows) => {
      transporter.sendMail(
        {
          from: "agafarno@hotmail.com",
          to: rows.email,
          subject: "Your request has been rejected",
          text: "We regret to inform you that your match request was rejected. Click here to find a new match",
        },
        (err, info) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Email sent to ${row.email}: ${info.response}`);
          }
        }
      );
    });

    // release the connection pool
    pool.end();
  });
};

// var mailOptions = {
//   from: "migue.desimone@hotmail.com",
//   to: userEmail,
//   subject: "Sending Email using Node.js",
//   text: "That was easy!",
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

module.exports = {
  getAll,
  getById,
  createUser,
  sign_in,
  buddyRequest,
  buddyRejected,
  buddyAccepted,
};
