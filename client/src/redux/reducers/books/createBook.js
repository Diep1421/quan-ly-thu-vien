import { http } from "../../../Utils/baseUrl";

export const CallCreateBook = async (data) => {
  try {
    const result = await http.post("/book/create-book", data);
    return result.data;
  } catch (error) {
    return error;
  }
};
