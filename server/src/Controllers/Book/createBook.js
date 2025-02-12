const Book = require("../../Models/Book.model");
const Author = require("../../Models/Author.model");
const Major = require("../../Models/Major.model");
const Subject = require("../../Models/Subject.model");
const Department = require("../../Models/Department.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const createBook = async (req, res) => {
  try {
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
    // Kiểm tra xem các trường có tồn tại trong database không
    const authorExists = await Author.findById(author);
    if (!authorExists) return failCode(res, null, "Tác giả không tồn tại");

    const majorExists = await Major.findById(major);
    if (major && !majorExists)
      return failCode(res, null, "Ngành không tồn tại");

    const subjectExists = await Subject.findById(subject);
    if (subject && !subjectExists)
      return failCode(res, null, "Môn học không tồn tại");

    const departmentExists = await Department.findById(department);
    if (department && !departmentExists)
      return failCode(res, null, "Khoa không tồn tại");

    // Tạo sách mới nếu tất cả dữ liệu hợp lệ
    const book = await Book.create({
      title,
      description,
      published_date,
      isbn,
      author,
      major,
      subject,
      department,
    });

    return successCode(res, book, "Tạo sách thành công");
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { createBook };
