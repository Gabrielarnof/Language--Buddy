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
    await pool.query(
      "SELECT * FROM user_info JOIN languages ON user_info.language=languages.id JOIN language_level  ON  language_level.id=user_info.language_level",
      (error, result) => {
        res.json(result.rows);
      }
    );
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      "SELECT * FROM user_info JOIN languages ON user_info.language=languages.id JOIN language_level  ON  language_level.id=user_info.language_level WHERE user_info.id=$1",
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

    //I changed a little because the field with newuser.id was empty and I could not get id
    // const current_id = newUser.rows[0].id;
    const jwtToken = jwtGenerator(newUser.rows[0].id);
    return res.json({ jwtToken, isAuthenticated: true });
  } catch (error) {
    console.error(error.message);
    res.status(400).json(`this ${username} already exist!`);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM user_info WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ error: "Invalid Credential", isAuthenticated: false });
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ error: "Invalid Credential", isAuthenticated: false });
    }
    const jwtToken = jwtGenerator(user.rows[0].id);
    return res.status(200).json({ jwtToken: jwtToken, isAuthenticated: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const edit = async (req, res) => {
  const id = req.params.id;

  const newUsername = req.body.username;
  const newName = req.body.full_name;
  const newBirth = req.body.date_of_birth;
  const newGender = req.body.gender;
  const newNationality = req.body.nationality;
  const newLanguage = req.body.language;
  const newLevel = req.body.language_level;
  const newDescription = req.body.description;

  try {
    let update_user = await pool.query(
      "UPDATE user_info SET username=$1, full_name=$2, gender=$3, nationality=$4, language=$5, language_level=$6, description=$7, date_of_birth=$8 WHERE id=$9 RETURNING *",
      [
        newUsername,
        newName,
        newGender,
        newNationality,
        newLanguage,
        newLevel,
        newDescription,
        newBirth,
        id,
      ]
    );

    return res.status(200).json({ user: update_user.rows[0] });
  } catch (error) {
    console.error(error.message);
  }
};

const delete_user = async (req, res) => {
  const { id } = req.params;

  try {
    await pool
      .query("DELETE FROM user_info WHERE id=$1", [id])
      .then(() => res.send(`User ${id} deleted!`));
  } catch (error) {
    console.log(error.message);
  }
};

// const sign_in = async (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;
//   console.log(email);
//   console.log(password);
//   const logIn = "SELECT * FROM user_info WHERE email = $1 and password = $2";
//   pool.query(logIn, [email, password], (error, result) => {
//     console.log(error);
//     console.log(result);
//     if (result.rows.length === 0) {
//       return res.status(400).send("User doesn't exist");
//     } else if (
//       (result.rows[0].email === email) &
//       (result.rows[0].password === password)
//     ) {
//       return res.status(200).send("Success");
//     }
//   });
// };

const auth = async (req, res) => {
  try {
    res.status(200).send({ isAuthenticated: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: error.message, isAuthenticated: false });
  }
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

const buddy_Request = async (req, res) => {
  pool.query("SELECT email FROM user_info WHERE id = $1", (err, res) => {
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
  pool.query("SELECT email FROM user_info WHERE id = $1", (err, res) => {
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
  pool.query("SELECT email FROM user_info WHERE id = $1", (err, res) => {
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
  buddy_Request,
  buddyRejected,
  buddyAccepted,
  login,
  edit,
  delete_user,
  auth,
};
