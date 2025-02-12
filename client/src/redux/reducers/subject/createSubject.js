import { http } from "../../../Utils/baseUrl";

export const CallCreateSubject = async (data) => {
  try {
    const result = await http.post("/subject/create-subject", data);
    return result.data;
  } catch (error) {
    return error;
  }
};
