const express = require("express");
const proposeRoute = express.Router();
const { updatePropose } = require("../../Controllers/Propose/updatePropose");

proposeRoute.put("/update-propose/:id", updatePropose);

module.exports = proposeRoute;
