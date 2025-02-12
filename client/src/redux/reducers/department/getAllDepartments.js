import { http } from "../../../Utils/baseUrl";

export const CallGetAllDepartments = async () => {
  try {
    const result = await http.get("/department/get-all-departments");
    return result.data;
  } catch (error) {
    return error;
  }
};
