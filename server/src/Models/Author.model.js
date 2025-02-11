const mongoose = require("mongoose");
const { Schema } = mongoose;

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    date_of_birth: {
      type: String,
    },
    date_of_death: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const Author = mongoose.model("Author", AuthorSchema);
module.exports = Author;
