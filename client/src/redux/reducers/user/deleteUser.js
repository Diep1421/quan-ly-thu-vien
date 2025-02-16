import { http } from "../../../Utils/baseUrl";

export const CallDeleteUser = async (id) => {
  try {
    const result = await http.delete(`/users/delete-user/${id}`);
    return result.data;
  } catch (error) {
    return error;
  }
};
