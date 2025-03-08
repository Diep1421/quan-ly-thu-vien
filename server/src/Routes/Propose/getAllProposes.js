const express = require("express");
const proposeRoute = express.Router();
const { getAllProposes } = require("../../Controllers/Propose/getAllProposes");

proposeRoute.get("/get-all-proposes", getAllProposes);

module.exports = proposeRoute;
