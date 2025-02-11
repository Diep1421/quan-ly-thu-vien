const Subject = require("../../Models/Subject.model");
const { failCode, successCode, errorCodeNew } = require("../../config/reponse");

const createSubject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const subject = await Subject.create({
      name,
      description,
    });
    return successCode(res, subject, "Tạo Môn Học thành công");
  } catch (error) {
    return errorCodeNew(error, "Lỗi 500");
  }
};

module.exports = { createSubject };
