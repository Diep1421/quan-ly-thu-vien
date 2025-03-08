import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../Utils/baseUrl";

const initialState = {
  listProposes: [],
};

const getAllProposes = createSlice({
  name: "getAllProposes",
  initialState,
  reducers: {
    setListProposes: (state, action) => {
      state.listProposes = action.payload;
    },
  },
});

export const { setListProposes } = getAllProposes.actions;
export default getAllProposes.reducer;

export const CallGetAllProposes = ({ keyword, sortBy, page, limit, order }) => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `/propose/get-all-proposes?page=${page}&limit=${limit}&sortBy=${sortBy}&keyword=${keyword}&order=${order}`
      );
      dispatch(setListProposes(result.data.content));
      return result.data.content;
    } catch (error) {
      console.log(error);
    }
  };
};
