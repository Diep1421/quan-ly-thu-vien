const Propose = require("../../Models/Propose.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const updatePropose = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params
    const { name, description } = req.body; // Lấy dữ liệu cần cập nhật
    const propose = await Propose.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
      },
      { new: true }
    );
    console.log(id);

    console.log(propose);

    if (!propose) {
      return failCode(res, null, "Không tìm thấy Đề Xuất");
    }
    return successCode(res, propose, "Cập nhật Đề Xuất thành công");
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { updatePropose };
