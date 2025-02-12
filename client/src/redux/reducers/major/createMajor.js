import { http } from "../../../Utils/baseUrl";

export const CallCreateMajor = async (data) => {
  try {
    const result = await http.post("/major/create-major", data);
    return result.data;
  } catch (error) {
    return error;
  }
};
