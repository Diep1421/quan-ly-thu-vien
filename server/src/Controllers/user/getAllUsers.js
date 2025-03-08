const User = require("../../Models/User.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const getAllUsers = async (req, res) => {
  const {
    keyword,
    sortBy = "first_name",
    page = 1,
    limit = 10,
    order = "asc",
  } = req.query;
  try {
    const filter = keyword
      ? { first_name: { $regex: new RegExp(keyword, "i") } }
      : {};
    const sortOrder = order === "desc" ? -1 : 1;

    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);

    const skip = (pageInt - 1) * limitInt;
    const result = await User.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitInt);
    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limitInt);
    if (result) {
      return successCode(
        res,
        { result, totalUsers, page: pageInt, totalPages: totalPages },
        "lấy danh sách user thành công"
      );
    }
    return failCode(res, "", "Danh sách user trống");
  } catch (error) {
    return errorCode(error, "Lỗi 500");
  }
};
module.exports = { getAllUsers };
