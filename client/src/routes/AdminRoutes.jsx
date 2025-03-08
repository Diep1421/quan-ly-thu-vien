import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHomePage from "../pages/AdminHomePage.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import Book from "../components/admin/Book/Book.jsx";
import Author from "../components/admin/Author/Author.jsx";
import Subject from "../components/admin/Subject/Subject.jsx";
import Department from "../components/admin/Department/Department.jsx";
import Major from "../components/admin/Major/Major.jsx";
import Propose from "../components/admin/Propose/Propose.jsx";
import User from "../components/admin/User/User.jsx";
export default function AdminRoutes() {
  return (
    <Routes element={<AdminLayout />}>
      <Route path="/manage/" element={<AdminHomePage />}>
        <Route path="book" element={<Book />} />
        <Route path="author" element={<Author />} />
        <Route path="subject" element={<Subject />} />
        <Route path="department" element={<Department />} />
        <Route path="major" element={<Major />} />
        <Route path="user" element={<User />} />
        <Route path="propose" element={<Propose />} />
      </Route>
    </Routes>
  );
}
