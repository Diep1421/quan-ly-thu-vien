import { http } from "../../../Utils/baseUrl";

export const CallUpdateDepartment = async (id, data) => {
  try {
    const result = await http.put(`/department/update-department/${id}`, data);
    return result.data;
  } catch (error) {
    return error;
  }
};
