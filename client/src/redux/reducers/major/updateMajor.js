import { http } from "../../../Utils/baseUrl";

export const CallUpdateMajor = async (id, data) => {
  try {
    const result = await http.put(`/major/update-major/${id}`, data);
    return result.data;
  } catch (error) {
    return error;
  }
};
