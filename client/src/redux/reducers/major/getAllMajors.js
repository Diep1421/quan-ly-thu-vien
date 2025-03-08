import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../Utils/baseUrl";

const initialState = {
  listMajors: [],
};

const getAllMajors = createSlice({
  name: "getAllMajors",
  initialState,
  reducers: {
    setListMajors: (state, action) => {
      state.listMajors = action.payload;
    },
  },
});

export const { setListMajors } = getAllMajors.actions;
export default getAllMajors.reducer;

export const CallGetAllMajors = ({ keyword, sortBy, page, limit, order }) => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `/major/get-all-majors?page=${page}&limit=${limit}&sortBy=${sortBy}&keyword=${keyword}&order=${order}`
      );
      dispatch(setListMajors(result.data.content));
      return result.data.content;
    } catch (error) {
      console.log(error);
    }
  };
};
