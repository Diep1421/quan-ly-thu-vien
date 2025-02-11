const Department = require("../../Models/Department.model");
const { failCode, successCode, errorCodeNew } = require("../../config/reponse");

const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    const department = await Department.create({
      name,
      description,
    });
    return successCode(res, department, "Tạo Khoa thành công");
  } catch (error) {
    return errorCodeNew(error, "Lỗi 500");
  }
};

module.exports = { createDepartment };
