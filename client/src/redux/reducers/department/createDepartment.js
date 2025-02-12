import { http } from "../../../Utils/baseUrl";

export const CallCreateDepartment = async (data) => {
  try {
    const result = await http.post("/department/create-department", data);
    return result.data;
  } catch (error) {
    return error;
  }
};
