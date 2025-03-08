const User = require("../../Models/User.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");
const bcrypt = require("bcrypt");
const createUser = async (req, res) => {
  try {
    const { username, first_name, last_name, email, password, phone, role } =
      req.body;

    // Kiểm tra nếu email đã tồn tại trong hệ thống
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return failCode(res, "", "Email đã tồn tại.");
    }

    // Tạo người dùng mới và lưu vào database
    const user = await User.create({
      username,
      first_name,
      last_name,
      email,
      password: await bcrypt.hash(password, 10), // Lưu mật khẩu thô
      phone,
      role,
    });

    return successCode(res, user, "Đăng Ký thành công");
  } catch (error) {
    console.error(error);
    return errorCode(error, "Lỗi 500");
  }
};

module.exports = { createUser };
