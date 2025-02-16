import { http } from "../../../Utils/baseUrl";

export const CallUpdateSubject = async (id, data) => {
  try {
    const result = await http.put(`/subject/update-subject/${id}`, data);
    return result.data;
  } catch (error) {
    return error;
  }
};
