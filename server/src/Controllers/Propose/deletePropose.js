const Propose = require("../../Models/Propose.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const deletePropose = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ params

    const propose = await Propose.findByIdAndDelete(id); // Xóa khoa theo ID

    console.log("Deleted Propose:", propose);

    if (!propose) {
      return failCode(res, null, "Không tìm thấy Đề Xuất để xóa");
    }

    return successCode(res, propose, "Xóa Đề Xuất thành công");
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { deletePropose };
