import { http } from "../../../Utils/baseUrl";

export const CallGetALlBooks = async ({
  keyword,
  sortBy,
  page,
  limit,
  order,
}) => {
  try {
    if (keyword.trim() || keyword == "") {
      const result = await http.get(
        `/book/get-all-books?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`
      );
      return result.data.content;
    }
    const result = await http.get(
      `/book/get-all-books?page=${page}&limit=${limit}&sortBy=${sortBy}&keyword=${keyword}&order=${order}`
    );
    return result.data.content;
  } catch (error) {
    console.log(error);
  }
};
