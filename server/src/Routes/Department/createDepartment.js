const express = require("express");
const departmentRoute = express.Router();
const {
  createDepartment,
} = require("../../Controllers/Department/createDepartment");

departmentRoute.post("/create-department", createDepartment);

module.exports = departmentRoute;
