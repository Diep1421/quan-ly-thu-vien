import { http } from "../../../Utils/baseUrl";

export const CallGetAllMajors = async () => {
  try {
    const result = await http.get("/major/get-all-majors");
    return result.data;
  } catch (error) {
    return error;
  }
};
