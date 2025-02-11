const express = require("express");
const bookRoute = express.Router();
const { createBook } = require("../../Controllers/Book/createBook");

bookRoute.post("/create-book", createBook);

module.exports = bookRoute;
