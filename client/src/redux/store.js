import { configureStore } from "@reduxjs/toolkit";
import getAllBooks from "./reducers/books/getAllBooks";
import getAllAuthors from "./reducers/author/getAllAuthor";
import getAllMajors from "./reducers/major/getAllMajors";
import getAllProposes from "./reducers/propose/getAllProposes";
import getAllDepartments from "./reducers/department/getAllDepartments";
import getAllSubjects from "./reducers/subject/getAllSubjects";
import getAllUsers from "./reducers/user/getAllUsers";
export const store = configureStore({
  reducer: {
    getAllBooks,
    getAllAuthors,
    getAllMajors,
    getAllProposes,
    getAllDepartments,
    getAllSubjects,
    getAllUsers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
