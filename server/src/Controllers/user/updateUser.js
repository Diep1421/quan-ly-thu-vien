const User = require("../../Models/User.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params
    const { username, first_name, last_name, email, phone, password, role } =
      req.body;
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        username,
        first_name,
        last_name,
        email,
        phone,
        password,
        role,
      },
      { new: true }
    );
    if (!user) {
      return failCode(res, null, "Không tìm thấy sách");
    }
    return successCode(res, user, "Cập nhật sách thành công");
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { updateUser };
