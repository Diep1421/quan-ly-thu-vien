const express = require("express");
const bookRoute = express.Router();
const { getAllBooks } = require("../../Controllers/Book/getAllBooks");

bookRoute.get("/get-all-books", getAllBooks);
module.exports = bookRoute;
