//   src/routes/index.js file này sẽ quản lý tất cả các Router
const express = require("express");
const rootRoute = express.Router();

const signUp = require("./Auth/signUp");
const login = require("./Auth/login");

const getAllUsers = require("./user/getAllUsers");
const getUserById = require("./user/getUserById");
const createUser = require("./user/createUser");
const updateUser = require("./user/updateUser");
const deleteUser = require("./user/deleteUser");

const createAuthor = require("./Author/createAuthor");
const getAllAuthors = require("./Author/getAllAuthors");
const updateAuthors = require("./Author/updateAuthor");
const deleteAuthors = require("./Author/deleteAuthor");
//auth
const createDepartment = require("./Department/createDepartment");
const getAllDepartments = require("./Department/getAllDepartments");
const updateDepartments = require("./Department/updateDepartment");
const deleteDepartments = require("./Department/deleteDepartment");

//departmernt
const createMajor = require("./Major/createMajor");
const getAllMajors = require("./Major/getAllMajors");
const updateMajors = require("./Major/updateMajor");
const deleteMajors = require("./Major/deleteMajor");
//Major
const createPropose = require("./Propose/createPropose");
const getAllProposes = require("./Propose/getAllProposes");
const updatePropose = require("./Propose/updatePropose");
const deletePropose = require("./Propose/deletePropose");
//Propose

const createSubject = require("./Subject/createSubject");
const getAllSubjects = require("./Subject/getAllSubjects");
const updateSubjects = require("./Subject/updateSubject");
const deleteSubjects = require("./Subject/deleteSubject");
//Subject

const createBook = require("./Book/createBook");
const getAllBooks = require("./Book/getAllBooks");
const updateBooks = require("./Book/updateBook");
const deleteBooks = require("./Book/deleteBook");
//book
rootRoute.use("/auth", signUp);
rootRoute.use("/auth", login);

rootRoute.use("/users", getAllUsers);
rootRoute.use("/users", getUserById);
rootRoute.use("/users", createUser);
rootRoute.use("/users", updateUser);
rootRoute.use("/users", deleteUser);

//author
rootRoute.use("/author", createAuthor);
rootRoute.use("/author", getAllAuthors);
rootRoute.use("/author", updateAuthors);
rootRoute.use("/author", deleteAuthors);

// department
rootRoute.use("/department", createDepartment);
rootRoute.use("/department", getAllDepartments);
rootRoute.use("/department", updateDepartments);
rootRoute.use("/department", deleteDepartments);

//MAJOR
rootRoute.use("/major", createMajor);
rootRoute.use("/major", getAllMajors);
rootRoute.use("/major", updateMajors);
rootRoute.use("/major", deleteMajors);

// propose
rootRoute.use("/propose", createPropose);
rootRoute.use("/propose", getAllProposes);
rootRoute.use("/propose", updatePropose);
rootRoute.use("/propose", deletePropose);

//Subject
rootRoute.use("/subject", createSubject);
rootRoute.use("/subject", getAllSubjects);
rootRoute.use("/subject", updateSubjects);
rootRoute.use("/subject", deleteSubjects);

//Book
rootRoute.use("/book", createBook);
rootRoute.use("/book", getAllBooks);
rootRoute.use("/book", updateBooks);
rootRoute.use("/book", deleteBooks);

//nhớ export
module.exports = rootRoute;
