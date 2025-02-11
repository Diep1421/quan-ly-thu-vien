const express = require("express");
const subjectRoute = express.Router();
const { deleteSubject } = require("../../Controllers/Subject/deleteSubject");

subjectRoute.delete("/delete-subject/:id", deleteSubject);

module.exports = subjectRoute;
