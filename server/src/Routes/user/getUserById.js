const express = require("express");
const userRoute = express.Router();
const { getUserById } = require("../../Controllers/user/getUserById");

userRoute.get("/get-user-by-id/:id", getUserById);

module.exports = userRoute;
