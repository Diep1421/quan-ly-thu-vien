const express = require("express");
const authRoute = express.Router();
const { getAllUsers } = require("../../Controllers/user/getAllUsers");

authRoute.get("/get-all-users", getAllUsers);

module.exports = authRoute;
