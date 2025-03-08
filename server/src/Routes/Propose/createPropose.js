const express = require("express");
const proposeRoute = express.Router();
const { createPropose } = require("../../Controllers/Propose/createPropose");

proposeRoute.post("/create-propose", createPropose);

module.exports = proposeRoute;
