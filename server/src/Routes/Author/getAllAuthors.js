const express = require("express");
const authorRoute = express.Router();
const { getAllAuthors } = require("../../Controllers/Author/getAllAuthors");

authorRoute.get("/get-all-authors", getAllAuthors);

module.exports = authorRoute;
