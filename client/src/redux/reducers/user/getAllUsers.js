import { http } from "../../../Utils/baseUrl";

export const CallGetAllUsers = async () => {
  try {
    const result = await http.get("/users/get-all-users");
    console.log(result);
    return result.data;
  } catch (error) {
    return error;
  }
};
