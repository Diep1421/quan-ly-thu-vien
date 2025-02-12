const Department = require("../../Models/Department.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ params

    const department = await Department.findByIdAndDelete(id); // Xóa khoa theo ID

    console.log("Deleted Department:", department);

    if (!department) {
      return failCode(res, null, "Không tìm thấy khoa để xóa");
    }

    return successCode(res, department, "Xóa khoa thành công");
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { deleteDepartment };
