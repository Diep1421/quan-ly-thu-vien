const express = require("express");
const authorRoute = express.Router();
const { createAuthor } = require("../../Controllers/Author/createAuthor");

authorRoute.post("/create-author", createAuthor);

module.exports = authorRoute;
