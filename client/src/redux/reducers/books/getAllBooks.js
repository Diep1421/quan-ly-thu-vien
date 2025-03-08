// Tất cả những API (get) thì code theo cấu trúc sau:
import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../Utils/baseUrl";

const initialState = {
  listBooks: [],
};
const getAllBooks = createSlice({
  name: "getAllBooks",
  initialState,
  reducers: {
    setListBooks: (state, action) => {
      state.listBooks = action.payload;
    },
  },
});
export const { setListBooks } = getAllBooks.actions;
export default getAllBooks.reducer;
export const CallGetALlBooks = ({ keyword, sortBy, page, limit, order }) => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `/book/get-all-books?page=${page}&limit=${limit}&sortBy=${sortBy}&keyword=${keyword}&order=${order}`
      );
      dispatch(setListBooks(result.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};
