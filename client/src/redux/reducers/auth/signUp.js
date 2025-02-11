import { http } from "../../../Utils/baseUrl";

export const CallSignUp = async (data) => {
  try {
    const result = await http.post("/auth/signUp", data);
    return result;
  } catch (error) {
    console.log(error);
  }
};
