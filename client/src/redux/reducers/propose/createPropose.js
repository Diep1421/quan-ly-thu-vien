import { http } from "../../../Utils/baseUrl";

export const CallCreatePropose = async (data) => {
  try {
    const result = await http.post("/propose/create-propose", data);
    return result.data;
  } catch (error) {
    return error;
  }
};
