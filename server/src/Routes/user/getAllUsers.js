const express = require("express");
const userRoute = express.Router();
const { getAllUsers } = require("../../Controllers/user/getAllUsers");

userRoute.get("/get-all-users", getAllUsers);

module.exports = userRoute;
