const Propose = require("../../Models/Propose.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const getAllProposes = async (req, res) => {
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
    const result = await Propose.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitInt);
    const totalProposes = await Propose.countDocuments(filter);
    const totalPages = Math.ceil(totalProposes / limitInt);
    if (result) {
      return successCode(
        res,
        { result, totalProposes, page: pageInt, totalPages: totalPages },
        "lấy danh sách Đề Xuất thành công"
      );
    }
    return failCode(res, "", "Danh sách Đề Xuất trống");
  } catch (error) {
    return errorCode(error, "Lỗi 500");
  }
};
module.exports = { getAllProposes };
