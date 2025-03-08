const { successCode, failCode, errorCode } = require("../../config/reponse");
const Author = require("../../Models/Author.model");

const getAllAuthors = async (req, res) => {
  const {
    keyword,
    sortBy = "name",
    page = 1,
    limit = 10,
    order = "asc",
  } = req.query;
  try {
    const filter = keyword
      ? { name: { $regex: new RegExp(keyword, "i") } }
      : {};
    const sortOrder = order === "desc" ? -1 : 1;

    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);

    const skip = (pageInt - 1) * limitInt;
    const result = await Author.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitInt);
    const totalAuthors = await Author.countDocuments(filter);
    const totalPages = Math.ceil(totalAuthors / limitInt);
    if (result) {
      return successCode(
        res,
        { result, totalAuthors, page: pageInt, totalPages: totalPages },
        "lấy danh sách tác giả thành công"
      );
    }
    return failCode(res, "", "danh sách tác giả trống");
  } catch (error) {
    return errorCode(error, "Lỗi 500");
  }
};
module.exports = { getAllAuthors };
