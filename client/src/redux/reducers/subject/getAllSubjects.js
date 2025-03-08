import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../Utils/baseUrl";

const initialState = {
  listSubjects: [],
};

const getAllSubjects = createSlice({
  name: "getAllSubjects",
  initialState,
  reducers: {
    setListSubjects: (state, action) => {
      state.listSubjects = action.payload;
    },
  },
});

export const { setListSubjects } = getAllSubjects.actions;
export default getAllSubjects.reducer;

export const CallGetAllSubjects = ({ keyword, sortBy, page, limit, order }) => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `/subject/get-all-subjects?page=${page}&limit=${limit}&sortBy=${sortBy}&keyword=${keyword}&order=${order}`
      );
      dispatch(setListSubjects(result.data.content));
      return result.data.content;
    } catch (error) {
      console.log(error);
    }
  };
};
