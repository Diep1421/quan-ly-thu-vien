import React from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Book from "../components/user/Book.jsx";
import Propose from "../components/user/Propose.jsx";
import Feedback from "../components/user/Feedback.jsx";
import Profile from "../components/user/Profile.jsx";
export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="book" element={<Book />} />
        <Route path="propose" element={<Propose />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
}
