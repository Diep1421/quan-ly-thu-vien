const Subject = require("../../Models/Subject.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ params

    const subject = await Subject.findByIdAndDelete(id); // Xóa môn học theo ID

    console.log("Deleted Subject:", subject);

    if (!subject) {
      return failCode(res, null, "Không tìm thấy Môn học để xóa");
    }

    return successCode(res, subject, "Xóa Môn Học thành công");
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { deleteSubject };
