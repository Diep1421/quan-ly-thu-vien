const express = require("express");
const departmentRoute = express.Router();
const {
  getAllDepartments,
} = require("../../Controllers/Department/getAllDepartments");

departmentRoute.get("/get-all-departments", getAllDepartments);

module.exports = departmentRoute;
