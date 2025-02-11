const mongoose = require("mongoose");
const { Schema } = mongoose;

const MajorSchema = new Schema(
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

const Major = mongoose.model("Major", MajorSchema);
module.exports = Major;
