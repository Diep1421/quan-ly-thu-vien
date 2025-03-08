const Propose = require("../../Models/Propose.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const createPropose = async (req, res) => {
  try {
    const { name, description } = req.body;
    const propose = await Propose.create({
      name,
      description,
    });
    return successCode(res, propose, "Tạo Đề Xuất thành công");
  } catch (error) {
    return errorCode(error, "Lỗi 500");
  }
};

module.exports = { createPropose };
