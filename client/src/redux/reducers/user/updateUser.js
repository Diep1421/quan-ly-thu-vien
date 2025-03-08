import { http } from "../../../Utils/baseUrl";

export const CallUpdateUser = async (id, data) => {
  try {
    const result = await http.put(`/users/update-user/${id}`, data);
    return result.data;
  } catch (error) {
    return error;
  }
};
