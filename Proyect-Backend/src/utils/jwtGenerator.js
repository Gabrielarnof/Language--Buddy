const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
    return jwt.sign({ sub: user_id}, process.env.jwtSecret, {expiresIn: "1h"});
}

module.exports = jwtGenerator;
