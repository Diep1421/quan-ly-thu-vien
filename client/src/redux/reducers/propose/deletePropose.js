import { http } from "../../../Utils/baseUrl";

export const CallDeletePropose = async (id) => {
  try {
    const result = await http.delete(`/propose/delete-propose/${id}`);
    return result.data;
  } catch (error) {
    return error;
  }
};
