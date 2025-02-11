const User = require("../../Models/User.model");
const { failCode, successCode, errorCodeNew } = require("../../config/reponse");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //findOne({truyền duy nhất})
    // find({truyền so sánh : email:email})
    const checkEmail = await User.findOne({ email });
    if (checkEmail && password === checkEmail.password) {
      return successCode(
        res,
        {
          username: checkEmail.username,
          first_name: checkEmail.first_name,
          last_name: checkEmail.last_name,
          email: checkEmail.email,
          phone: checkEmail.phone,
          role: checkEmail.role,
        },
        "Đăng nhập thành công."
      );
    }

    return failCode(res, "", "Email hoặc password sai");
  } catch (error) {
    return errorCodeNew(error, "Lỗi 500");
  }
};
module.exports = { login };
