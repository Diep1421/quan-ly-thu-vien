const express = require("express");
const authRoute = express.Router();
const { getUserById } = require("../../Controllers/user/getUserById");

authRoute.get("/get-user-by-id/:id", getUserById);

module.exports = authRoute;
