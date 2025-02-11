const express = require("express");
const departmentRoute = express.Router();
const {
  deleteDepartment,
} = require("../../Controllers/Department/deleteDepartment");

departmentRoute.delete("/delete-department/:id", deleteDepartment);

module.exports = departmentRoute;
