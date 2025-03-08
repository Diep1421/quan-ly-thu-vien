import { http } from "../../../Utils/baseUrl";

export const CallSignUp = async (data) => {
  try {
    const result = await http.post("/auth/signup", data);
    return result;
  } catch (error) {
    return error;
  }
};
