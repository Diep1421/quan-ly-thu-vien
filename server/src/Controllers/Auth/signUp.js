const User = require("../../Models/User.model");
const { failCode, successCode, errorCodeNew } = require("../../config/reponse");

const signUp = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Kiểm tra nếu email đã tồn tại trong hệ thống
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return failCode(res, "", "Email đã tồn tại.");
    }

    // Tạo người dùng mới và lưu vào database
    const user = await User.create({
      first_name,
      last_name,
      email,
      password, // Lưu mật khẩu thô
      role: "user",
    });

    return successCode(res, user, "Đăng Ký thành công");
  } catch (error) {
    console.error(error);
    return errorCodeNew(error, "Lỗi 500");
  }
};

module.exports = { signUp };
