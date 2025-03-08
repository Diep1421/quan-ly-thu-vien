const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProposeSchema = new Schema(
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

const Propose = mongoose.model("Propose", ProposeSchema);
module.exports = Propose;
