import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../Utils/baseUrl";

const initialState = {
  listAuthors: [],
};

const getAllAuthors = createSlice({
  name: "getAllAuthors",
  initialState,
  reducers: {
    setListAuthors: (state, action) => {
      state.listAuthors = action.payload;
    },
  },
});

export const { setListAuthors } = getAllAuthors.actions;
export default getAllAuthors.reducer;

export const CallGetAllAuthors = ({ keyword, sortBy, page, limit, order }) => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `/author/get-all-authors?page=${page}&limit=${limit}&sortBy=${sortBy}&keyword=${keyword}&order=${order}`
      );
      dispatch(setListAuthors(result.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};
