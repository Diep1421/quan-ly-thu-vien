const Major = require("../../Models/Major.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const getAllMajors = async (req, res) => {
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
    const result = await Major.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitInt);
    const totalMajors = await Major.countDocuments(filter);
    const totalPages = Math.ceil(totalMajors / limitInt);
    if (result) {
      return successCode(
        res,
        { result, totalMajors, page: pageInt, totalPages: totalPages },
        "lấy danh sách ngành thành công"
      );
    }
    return failCode(res, "", "Danh sách ngành trống");
  } catch (error) {
    return errorCode(error, "Lỗi 500");
  }
};
module.exports = { getAllMajors };
