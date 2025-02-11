const express = require("express");
const majorRoute = express.Router();
const { updateMajor } = require("../../Controllers/Major/updateMajor");

majorRoute.put("/update-major/:id", updateMajor);

module.exports = majorRoute;
