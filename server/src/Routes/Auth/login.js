const express = require("express");
const authRoute = express.Router();
const { login } = require("../../Controllers/Auth/login");

authRoute.post("/login", login);

module.exports = authRoute;
