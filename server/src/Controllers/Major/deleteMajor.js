const Major = require("../../Models/Major.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const deleteMajor = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ params

    const major = await Major.findByIdAndDelete(id); // Xóa khoa theo ID

    console.log("Deleted Major:", major);

    if (!major) {
      return failCode(res, null, "Không tìm thấy Ngành để xóa");
    }

    return successCode(res, major, "Xóa ngành thành công");
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { deleteMajor };
