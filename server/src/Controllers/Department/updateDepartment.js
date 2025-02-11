const Department = require("../../Models/Department.model");
const { failCode, successCode, errorCodeNew } = require("../../config/reponse");

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params
    const { name, description } = req.body; // Lấy dữ liệu cần cập nhật
    const department = await Department.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
      },
      { new: true }
    );
    console.log(id);

    console.log(department);

    if (!department) {
      return failCode(res, null, "Không tìm thấy khoa");
    }
    return successCode(res, department, "Cập nhật khoa thành công");
  } catch (error) {
    return errorCodeNew(res, error, "Lỗi 500");
  }
};

module.exports = { updateDepartment };
