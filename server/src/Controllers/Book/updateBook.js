const Book = require("../../Models/Book.model");
const { failCode, successCode, errorCodeNew } = require("../../config/reponse");

const updateBook = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params
    const { name, bio, date_of_birth, date_of_death } = req.body; // Lấy dữ liệu cần cập nhật
    const book = await Book.findOneAndUpdate(
      { _id: id },
      {
        name,
        bio,
        date_of_birth,
        date_of_death,
      },
      { new: true }
    );
    console.log(id);

    console.log(book);

    if (!book) {
      return failCode(res, null, "Không tìm thấy tác giả");
    }
    return successCode(res, book, "Cập nhật tác giả thành công");
  } catch (error) {
    return errorCodeNew(res, error, "Lỗi 500");
  }
};

module.exports = { updateBook };
