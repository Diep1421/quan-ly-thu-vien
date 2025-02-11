const express = require("express");
const majorRoute = express.Router();
const { createMajor } = require("../../Controllers/Major/createMajor");

majorRoute.post("/create-major", createMajor);

module.exports = majorRoute;
