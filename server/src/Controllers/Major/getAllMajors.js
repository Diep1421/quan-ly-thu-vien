const Major = require("../../Models/Major.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const getAllMajors = async (req, res) => {
  const { keyword } = req.query;
  try {
    const result = await Major.find({
      name: { $regex: new RegExp(keyword, "i") },
    });
    if (result) {
      return successCode(res, result, "lấy danh sách ngành thành công");
    }
    return failCode(res, "", "danh sách Nghành trống");
  } catch (error) {
    return errorCode(error, "Lỗi 500");
  }
};
module.exports = { getAllMajors };
