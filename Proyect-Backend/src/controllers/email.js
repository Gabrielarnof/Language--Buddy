

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
  pool.query("SELECT email FROM user_info WHERE id =2", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    const html =
      "<h1>You have a match request in Language Buddy</h1>     <p> We are happy to inform you that you have a match request to became a Language Buddy . Click here to see their request</p>";

    // const transporter = nodemailer.createTransport({
    //   service: "hotmail",
    //   auth: {
    //     user: "agafarno@hotmail.com",
    //     pass: "Quimica3599**",S
    //   },
    // });
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "agafarno@hotmail.com",
        pass: "Quimica3599**",
      },
    });

    res.rows.forEach((rows) => {
      transporter.sendMail(
        {
          from: "agafarno@hotmail.com",
          to: rows.email,
          subject: "You have a match request in Language Buddy",
          html: html,
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

// async function buddy_Request(userId1, userId2) {
//   const client = await pool.connect();
//   try {
//     const selectQuery = {
//       text: "SELECT email FROM user_info WHERE id = ($1, $2) ",
//       values: [userId1, userId2],
//     };

//     const result = await client.query(selectQuery);
//     const emails = result.rows.map((row) => row.email);
//     return emails;
//   } catch (e) {
//     throw e;
//   } finally {
//     client.release();
//   }
// }
// async function sendFriendshipRequest(userId1, userId2) {
//   const emails = await selectUserEmails(userId1, userId2);

//   const transporter = nodemailer.createTransport({
//     service: "hotmail",
//     auth: {
//       user: "agafarno@hotmail.com",
//       pass: "Quimica3599**",
//     },
//   });

//   const mailOptions = {
//     from: { userId2 },
//     to: emails.join(","),
//     subject: "Friendship Request",
//     text: `You have received a match request from user ${userId1}. To accept or decline the request, please log in to the application.`,
//   };

//   const info = await transporter.sendMail(mailOptions);
//   console.log(`Match request sent: ${info.messageId}`);
// }

const buddyAccepted = async (req, res) => {
  pool.query("SELECT email FROM user_info WHERE id = 2", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }

    const html1 =
      "<h1>Your request  has been  accepted</h1>     <p> We are happy to inform that your match request was accepted. Click here to get in contact with your new Buddy </p>";
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "agafarno@hotmail.com",
        pass: "Quimica3599**",
      },
    });

    res.rows.forEach((rows) => {
      transporter.sendMail(
        {
          from: "agafarno@hotmail.com",
          to: rows.email,
          subject: "Your request  has been  accepted",
          html: html1,
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
  pool.query("SELECT email FROM user_info WHERE id = 2", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    const html2 =
      "<h1>Your request has been rejected</h1>  <p> We regret to inform you that your match request was rejected. Click here to find a new match </p>";
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "agafarno@hotmail.com",
        pass: "Quimica3599**",
      },
    });

    res.rows.forEach((rows) => {
      transporter.sendMail(
        {
          from: "agafarno@hotmail.com",
          to: rows.email,
          subject: "Your request has been rejected",
          html: html2,
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
