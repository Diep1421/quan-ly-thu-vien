const User = require("../../Models/User.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ params

    const user = await User.findByIdAndDelete(id); // Xóa tác giả theo ID

    console.log("Deleted User:", user);

    if (!user) {
      return failCode(res, null, "Không tìm thấy user để xóa");
    }

    return successCode(res, user, "Xóa user thành công");
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { deleteUser };
