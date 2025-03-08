import { http } from "../../../Utils/baseUrl";

export const CallUpdatePropose = async (id, data) => {
  try {
    const result = await http.put(`/propose/update-propose/${id}`, data);
    return result.data;
  } catch (error) {
    return error;
  }
};
