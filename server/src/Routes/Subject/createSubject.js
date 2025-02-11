const express = require("express");
const subjectRoute = express.Router();
const { createSubject } = require("../../Controllers/Subject/createSubject");

subjectRoute.post("/create-subject", createSubject);

module.exports = subjectRoute;
