import { http } from "../../../Utils/baseUrl";

export const CallDeleteSubject = async (id) => {
  try {
    const result = await http.delete(`/subject/delete-subject/${id}`);
    return result.data;
  } catch (error) {
    return error;
  }
};
