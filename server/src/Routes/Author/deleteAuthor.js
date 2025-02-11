const express = require("express");
const authorRoute = express.Router();
const { deleteAuthor } = require("../../Controllers/Author/deleteAuthor");

authorRoute.delete("/delete-author/:id", deleteAuthor);

module.exports = authorRoute;
