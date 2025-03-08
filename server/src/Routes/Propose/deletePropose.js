const express = require("express");
const proposeRoute = express.Router();
const { deletePropose } = require("../../Controllers/Propose/deletePropose");

proposeRoute.delete("/delete-propose/:id", deletePropose);

module.exports = proposeRoute;
