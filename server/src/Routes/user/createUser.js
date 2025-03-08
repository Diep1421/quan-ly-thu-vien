const express = require("express");
const userRoute = express.Router();
const { createUser } = require("../../Controllers/user/createUser");

userRoute.post("/create-user", createUser);

module.exports = userRoute;
