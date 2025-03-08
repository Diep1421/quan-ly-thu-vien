const Book = require("../../Models/Book.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const updateBook = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params
    const {
      title,

      description,
      published_date,
      isbn,
      author,
      major,
      subject,
      department,
    } = req.body;
    if (!author || !major || !subject || !department) {
      return failCode(res, null, "Vui lòng nhập đầy đủ các trường");
    }
    const book = await Book.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
        published_date,
        isbn,
        author,

        major,
        subject,
        department,
      },
      { new: true }
    );
    if (!book) {
      return failCode(res, null, "Không tìm thấy sách");
    }
    return successCode(res, book, "Cập nhật sách thành công");
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { updateBook };
