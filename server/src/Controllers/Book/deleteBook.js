const Book = require("../../Models/Book.model");
const { failCode, successCode, errorCodeNew } = require("../../config/reponse");

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ params

    const book = await Book.findByIdAndDelete(id); // Xóa tác giả theo ID

    console.log("Deleted Book:", book);

    if (!book) {
      return failCode(res, null, "Không tìm thấy tác giả để xóa");
    }

    return successCode(res, book, "Xóa tác giả thành công");
  } catch (error) {
    return errorCodeNew(res, error, "Lỗi 500");
  }
};

module.exports = { deleteBook };
