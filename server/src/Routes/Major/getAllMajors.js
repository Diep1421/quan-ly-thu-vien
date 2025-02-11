const express = require("express");
const majorRoute = express.Router();
const { getAllMajors } = require("../../Controllers/Major/getAllMajors");

majorRoute.get("/get-all-majors", getAllMajors);

module.exports = majorRoute;
