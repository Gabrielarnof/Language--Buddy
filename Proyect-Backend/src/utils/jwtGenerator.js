const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
    return jwt.sign({ sub: user_id}, process.env.jwtSecret, {expiresIn: "8h"});
}

module.exports = jwtGenerator;
