import { http } from "../../../Utils/baseUrl";

export const CallGetAllAuthors = async () => {
  try {
    const result = await http.get("/author/get-all-authors");
    return result.data;
  } catch (error) {
    return error;
  }
};
