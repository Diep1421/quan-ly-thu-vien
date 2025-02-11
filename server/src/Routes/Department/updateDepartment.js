const express = require("express");
const departmentRoute = express.Router();
const {
  updateDepartment,
} = require("../../Controllers/Department/updateDepartment");

departmentRoute.put("/update-department/:id", updateDepartment);

module.exports = departmentRoute;
