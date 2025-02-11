const mongoose = require("mongoose");
const { Schema } = mongoose;
const SubjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const Subject = mongoose.model("Subject", SubjectSchema);
module.exports = Subject;
