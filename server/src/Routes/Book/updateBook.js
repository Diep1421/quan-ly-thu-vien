const express = require("express");
const bookRoute = express.Router();
const { updateBook } = require("../../Controllers/Book/updateBook");

bookRoute.put("/update-book/:id", updateBook);

module.exports = bookRoute;
