import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../Utils/baseUrl";

const initialState = {
  listDepartments: [],
};

const getAllDepartments = createSlice({
  name: "getAllDepartments",
  initialState,
  reducers: {
    setListDepartments: (state, action) => {
      state.listDepartments = action.payload;
    },
  },
});

export const { setListDepartments } = getAllDepartments.actions;
export default getAllDepartments.reducer;

export const CallGetAllDepartments = ({
  keyword,
  sortBy,
  page,
  limit,
  order,
}) => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `/department/get-all-departments?page=${page}&limit=${limit}&sortBy=${sortBy}&keyword=${keyword}&order=${order}`
      );
      dispatch(setListDepartments(result.data.content));
      return result.data.content;
    } catch (error) {
      console.log(error);
    }
  };
};
