const Book = require("../../Models/Book.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const getAllBooks = async (req, res) => {
  try {
    // Lấy các query parameter, thiết lập giá trị mặc định cho sortBy, page, limit, và order nếu chưa có
    const {
      keyword,
      sortBy = "title",
      page = 1,
      limit = 10,
      order = "asc",
    } = req.query;
    // Tạo bộ lọc tìm kiếm theo từ khóa (nếu có)
    const filter = keyword
      ? { title: { $regex: new RegExp(keyword, "i") } }
      : {};

    // Chuyển đổi `order` thành giá trị số (-1: desc, 1: asc)
    const sortOrder = order === "desc" ? -1 : 1;

    // Ép kiểu số cho page và limit
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);

    // Tính toán số bản ghi bỏ qua
    const skip = (pageInt - 1) * limitInt;

    // Tìm kiếm, sắp xếp và phân trang dữ liệu
    const result = await Book.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitInt)
      .populate("author", "name")
      .populate("subject", "name")
      .populate("department", "name")
      .populate("major", "name");

    // Tổng số sách trong database (dùng cho phân trang)
    const totalBooks = await Book.countDocuments(filter);
    const totalPages = Math.ceil(totalBooks / limitInt);
    return successCode(
      res,
      {
        result,
        totalBooks,
        page: pageInt,
        limit: limitInt,
        totalPages: totalPages,
      },
      "Lấy danh sách book thành công"
    );
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { getAllBooks };
