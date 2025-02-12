const User = require("../../Models/User.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findById(id);
    if (result) {
      return successCode(res, result, "lấy danh sách user thành công");
    }
    return failCode(res, "", "danh sách người dùng trống");
  } catch (error) {
    return errorCode(error, "Lỗi 500");
  }
};
module.exports = { getUserById };
