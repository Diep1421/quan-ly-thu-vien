const express = require("express");
const subjectRoute = express.Router();
const { updateSubject } = require("../../Controllers/Subject/updateSubject");

subjectRoute.put("/update-subject/:id", updateSubject);

module.exports = subjectRoute;
