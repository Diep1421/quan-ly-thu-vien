const Subject = require("../../Models/Subject.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const getAllSubjects = async (req, res) => {
  const { keyword } = req.query;
  try {
    const result = await Subject.find({
      name: { $regex: new RegExp(keyword, "i") },
    });
    if (result) {
      return successCode(res, result, "lấy danh sách Môn Học thành công");
    }
    return failCode(res, "", "danh sách Môn Học trống");
  } catch (error) {
    return errorCode(error, "Lỗi 500");
  }
};
module.exports = { getAllSubjects };
