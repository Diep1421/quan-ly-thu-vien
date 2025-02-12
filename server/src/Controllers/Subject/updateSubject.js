const Subject = require("../../Models/Subject.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const updateSubject = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params
    const { name, description } = req.body; // Lấy dữ liệu cần cập nhật
    const subject = await Subject.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
      },
      { new: true }
    );
    console.log(id);

    console.log(subject);

    if (!subject) {
      return failCode(res, null, "Không tìm thấy Môn học");
    }
    return successCode(res, subject, "Cập nhật Môn Học thành công");
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { updateSubject };
