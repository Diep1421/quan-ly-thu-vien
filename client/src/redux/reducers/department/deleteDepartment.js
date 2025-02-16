import { http } from "../../../Utils/baseUrl";

export const CallDeleteDepartment = async (id) => {
  try {
    const result = await http.delete(`/department/delete-department/${id}`);
    return result.data;
  } catch (error) {
    return error;
  }
};
