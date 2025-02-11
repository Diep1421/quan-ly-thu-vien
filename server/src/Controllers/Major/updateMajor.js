const Major = require("../../Models/Major.model");
const { failCode, successCode, errorCodeNew } = require("../../config/reponse");

const updateMajor = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params
    const { name, description } = req.body; // Lấy dữ liệu cần cập nhật
    const major = await Major.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
      },
      { new: true }
    );
    console.log(id);

    console.log(major);

    if (!major) {
      return failCode(res, null, "Không tìm thấy Ngành");
    }
    return successCode(res, major, "Cập nhật nghành thành công");
  } catch (error) {
    return errorCodeNew(res, error, "Lỗi 500");
  }
};

module.exports = { updateMajor };
