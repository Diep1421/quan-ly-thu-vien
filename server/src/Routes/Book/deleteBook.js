const express = require("express");
const bookRoute = express.Router();
const { deleteBook } = require("../../Controllers/Book/deleteBook");

bookRoute.delete("/delete-book/:id", deleteBook);

module.exports = bookRoute;
