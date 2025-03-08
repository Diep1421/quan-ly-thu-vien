// Tất cả những API (get) thì code theo cấu trúc sau:
import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../Utils/baseUrl";

const initialState = {
  listUsers: [],
};
const getAllUsers = createSlice({
  name: "getAllUsers",
  initialState,
  reducers: {
    setListUsers: (state, action) => {
      state.listUsers = action.payload;
    },
  },
});
export const { setListUsers } = getAllUsers.actions;
export default getAllUsers.reducer;
export const CallGetAllUsers = ({ keyword, sortBy, page, limit, order }) => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `/users/get-all-users?page=${page}&limit=${limit}&sortBy=${sortBy}&keyword=${keyword}&order=${order}`
      );
      dispatch(setListUsers(result.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};
