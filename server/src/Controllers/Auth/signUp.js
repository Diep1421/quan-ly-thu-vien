const User = require("../../Models/User.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");
const bcrypt = require("bcrypt");
const signUp = async (req, res) => {
  try {
    const { username, first_name, last_name, email, password, phone } =
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
      password: await bcrypt.hash(password, 10),
      phone,
      role: "user",
    });

    return successCode(res, user, "Đăng Ký thành công");
  } catch (error) {
    return errorCode(res, "Lỗi 500");
  }
};

module.exports = { signUp };
