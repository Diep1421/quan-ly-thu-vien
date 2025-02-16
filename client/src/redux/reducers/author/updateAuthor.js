import { http } from "../../../Utils/baseUrl";

export const CallUpdateAuthor = async (id, data) => {
  try {
    const result = await http.put(`/author/update-author/${id}`, data);
    return result.data;
  } catch (error) {
    return error;
  }
};
