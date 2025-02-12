const Author = require("../../Models/Author.model");
const { failCode, successCode, errorCode } = require("../../config/reponse");

const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params
    const { name, bio, date_of_birth, date_of_death } = req.body; // Lấy dữ liệu cần cập nhật
    const author = await Author.findOneAndUpdate(
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

    console.log(author);

    if (!author) {
      return failCode(res, null, "Không tìm thấy tác giả");
    }
    return successCode(res, author, "Cập nhật tác giả thành công");
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { updateAuthor };
