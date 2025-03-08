const User = require("../../Models/User.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");
const bcrypt = require("bcrypt");
const login = async (req, res) => {
  // try {
  const { email, password } = req.body;
  //findOne({truyền duy nhất})
  // find({truyền so sánh : email:email})
  const result = await User.findOne({ email });

  //check email là check xem email có tồn tại trong table
  //  user hay ko nếu tồn tại thì kiểm tra đến password
  if (result) {
    const { password: passwordHash, ...userInfo } = result.toObject();
    const checkPass = await bcrypt.compareSync(password, passwordHash);
    if (checkPass) {
      return successCode(res, userInfo, "Đăng nhập thành công.");
    } else {
      return failCode(res, "", "Mật khẩu không đúng!");
    }
  }
  return failCode(res, "", "Email hoặc password sai");
  // } catch (error) {
  //   return errorCode(res, "Lỗi 500");
  // }
};
module.exports = { login };
