const express = require("express");
const authorRoute = express.Router();
const { updateAuthor } = require("../../Controllers/Author/updateAuthor");

authorRoute.put("/update-author/:id", updateAuthor);

module.exports = authorRoute;
