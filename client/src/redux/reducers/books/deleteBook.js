import { http } from "../../../Utils/baseUrl";

export const CallDeleteBook = async (id) => {
  try {
    const result = await http.delete(`/book/delete-book/${id}`);
    return result.data;
  } catch (error) {
    return error;
  }
};
