import { http } from "../../../Utils/baseUrl";

export const CallUpdateBook = async (id, data) => {
  try {
    const result = await http.put(`/book/update-book/${id}`, data);
    return result.data;
  } catch (error) {
    return error;
  }
};
