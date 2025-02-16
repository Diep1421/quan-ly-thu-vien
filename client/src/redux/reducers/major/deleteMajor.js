import { http } from "../../../Utils/baseUrl";

export const CallDeleteMajor = async (id) => {
  try {
    const result = await http.delete(`/major/delete-major/${id}`);
    return result.data;
  } catch (error) {
    return error;
  }
};
