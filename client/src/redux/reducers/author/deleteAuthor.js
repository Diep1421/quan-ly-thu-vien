import { http } from "../../../Utils/baseUrl";

export const CallDeleteAuthor = async (id) => {
  try {
    const result = await http.delete(`/author/delete-author/${id}`);
    return result.data;
  } catch (error) {
    return error;
  }
};
