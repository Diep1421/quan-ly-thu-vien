const express = require("express");
const majorRoute = express.Router();
const { deleteMajor } = require("../../Controllers/Major/deleteMajor");

majorRoute.delete("/delete-major/:id", deleteMajor);

module.exports = majorRoute;
