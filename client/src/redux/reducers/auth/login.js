import { http } from "../../../Utils/baseUrl";

export const CallLogin = async (data) => {
  try {
    const result = await http.post("/auth/login", data);
    localStorage.setItem("dataUser", JSON.stringify(result.data.content));
    return result;
  } catch (error) {
    console.log(error);
  }
};
