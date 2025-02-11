const Author = require("../../Models/Author.model");
const { failCode, successCode, errorCodeNew } = require("../../config/reponse");

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ params

    const author = await Author.findByIdAndDelete(id); // Xóa tác giả theo ID

    console.log("Deleted Author:", author);

    if (!author) {
      return failCode(res, null, "Không tìm thấy tác giả để xóa");
    }

    return successCode(res, author, "Xóa tác giả thành công");
  } catch (error) {
    return errorCodeNew(res, error, "Lỗi 500");
  }
};

module.exports = { deleteAuthor };
