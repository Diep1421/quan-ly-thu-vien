const Subject = require("../../Models/Subject.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const getAllSubjects = async (req, res) => {
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
    const result = await Subject.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitInt);
    const totalSubjects = await Subject.countDocuments(filter);
    const totalPages = Math.ceil(totalSubjects / limitInt);
    if (result) {
      return successCode(
        res,
        {
          result,
          totalSubjects,
          page: pageInt,
          limit: limitInt,
          totalPages: totalPages,
        },
        "lấy danh sách Môn Học thành công"
      );
    }
    return failCode(res, "", "Danh sách Môn Học trống");
  } catch (error) {
    return errorCode(error, "Lỗi 500");
  }
};
module.exports = { getAllSubjects };
