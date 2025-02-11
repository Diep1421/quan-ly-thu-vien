const User = require("../../Models/User.model");
const { failCode, successCode, errorCodeNew } = require("../../config/reponse");

const getAllUsers = async (req, res) => {
  const { keyword } = req.query;
  try {
    const result = await User.find({
      username: { $regex: new RegExp(keyword, "i") },
    });
    if (result) {
      return successCode(res, result, "lấy danh sách user thành công");
    }
    return failCode(res, "", "danh sách người dùng trống");
  } catch (error) {
    return errorCodeNew(error, "Lỗi 500");
  }
};
module.exports = { getAllUsers };
