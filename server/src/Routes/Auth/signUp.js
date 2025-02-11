const express = require("express");
const authRoute = express.Router();
const { signUp } = require("../../Controllers/Auth/signUp");

authRoute.post("/signup", signUp);

module.exports = authRoute;
