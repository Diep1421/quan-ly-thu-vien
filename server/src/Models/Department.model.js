const mongoose = require("mongoose");
const { Schema } = mongoose;
const DepartmentSchema = new Schema(
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

const Department = mongoose.model("Department", DepartmentSchema);
module.exports = Department;
