import { http } from "../../../Utils/baseUrl";

export const CallGetUserById = async (id) => {
  try {
    const result = await http.get(`/users/get-user-by-id/${id}`);
    return result.data;
  } catch (error) {
    return error;
  }
};
