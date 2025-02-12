const Book = require("../../Models/Book.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const getAllBooks = async (req, res) => {
  // try {
  const { keyword, sortBy = "title", page = 1, limit, order } = req.query;

  // Tạo bộ lọc tìm kiếm theo từ khóa (nếu có)
  const filter = keyword ? { title: { $regex: new RegExp(keyword, "i") } } : {};

  // Chuyển đổi `order` thành giá trị số (-1: desc, 1: asc)
  const sortOrder = order === "desc" ? -1 : 1;

  // Tính toán số lượng bản ghi bỏ qua
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Tìm kiếm, sắp xếp và phân trang dữ liệu
  const books = await Book.find(filter)
    .populate("major", "name description")
    .populate("subject", "name description")
    .populate("author", "name")
    .populate("department", "name")
    .sort({ [sortBy]: sortOrder }) // Sắp xếp theo field mong muốn
    .skip(skip) // Bỏ qua `skip` bản ghi
    .limit(parseInt(limit)); // Giới hạn số lượng bản ghi trả về

  // Tổng số sách trong database (dùng cho phân trang)
  const totalBooks = await Book.countDocuments(filter);

  if (books.length > 0) {
    return successCode(
      res,
      { books, totalBooks, page: parseInt(page), limit: parseInt(limit) },
      "Lấy danh sách book thành công"
    );
  }
  return failCode(res, "", "Danh sách book trống");
  // } catch (error) {
  //   return errorCode(res, error, "Lỗi 500");
  // }
};

module.exports = { getAllBooks };
