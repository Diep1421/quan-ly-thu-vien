const express = require("express");
const subjectRoute = express.Router();
const { getAllSubjects } = require("../../Controllers/Subject/getAllSubjects");

subjectRoute.get("/get-all-subjects", getAllSubjects);

module.exports = subjectRoute;
