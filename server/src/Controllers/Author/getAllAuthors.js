const Author = require("../../Models/Author.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const getAllAuthors = async (req, res) => {
  const { keyword } = req.query;
  try {
    const result = await Author.find({
      name: { $regex: new RegExp(keyword, "i") },
    });
    if (result) {
      return successCode(res, result, "lấy danh sách tác giả thành công");
    }
    return failCode(res, "", "danh sách tác giả trống");
  } catch (error) {
    return errorCode(error, "Lỗi 500");
  }
};
module.exports = { getAllAuthors };
