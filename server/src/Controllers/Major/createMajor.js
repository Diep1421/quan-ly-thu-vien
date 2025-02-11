const Major = require("../../Models/Major.model");
const { failCode, successCode, errorCodeNew } = require("../../config/reponse");

const createMajor = async (req, res) => {
  try {
    const { name, description } = req.body;
    const major = await Major.create({
      name,
      description,
    });
    return successCode(res, major, "Tạo Ngành thành công");
  } catch (error) {
    return errorCodeNew(error, "Lỗi 500");
  }
};

module.exports = { createMajor };
