const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    published_date: {
      type: String,
    },
    isbn: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author", // Liên kết với Author model\
    },
    major: {
      type: Schema.Types.ObjectId,
      ref: "Major", // Liên kết với Major model (Ngành)
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject", // Liên kết với Subject model (Môn)
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department", // Liên kết với Department model (Khoa)
    },
  },
  {
    versionKey: false,
  }
);

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
