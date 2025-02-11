const Department = require("../../Models/Department.model");
const { failCode, successCode, errorCodeNew } = require("../../config/reponse");

const getAllDepartments = async (req, res) => {
  const { keyword } = req.query;
  try {
    const result = await Department.find({
      name: { $regex: new RegExp(keyword, "i") },
    });
    if (result) {
      return successCode(res, result, "lấy danh sách Khoa thành công");
    }
    return failCode(res, "", "danh sách người dùng trống");
  } catch (error) {
    return errorCodeNew(error, "Lỗi 500");
  }
};
module.exports = { getAllDepartments };
