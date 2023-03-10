const jwt = require("jsonwebtoken");
require("dotenv").config();


function authenticate(req, res, next) {

  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({
      message: "authorization denied",
      isAuthenticated: false
    });
  }

  token = token.split(" ")[1];

  try {
    const verify = jwt.verify(token, process.env.jwtSecret);
    req.user = { id: verify.sub } 

    next();

  } catch (err) {
    res.status(401).send({
      message: "Token is not valid",
      isAuthenticated: false
    });
  }
};

module.exports = authenticate;
