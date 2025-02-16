import "./App.css";
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import NavBar from "./components/layout/Navbar.jsx";
import AdminNavbar from "./components/layout/AdminNavbar.jsx";
import Home from "./components/layout/Home.jsx";
import Login from "./components/layout/Login.jsx";
import SignUp from "./components/layout/SignUp.jsx"; // Đổi signUp thành SignUp
// import UserNavbar from "./components/layout/UserNavbar.jsx";
import UserLayout from "./components/layout/UserLayout.jsx";
import LayoutAdmin from "./components/layout/LayoutAdmin.jsx";

function App() {
  const user = JSON.parse(localStorage.getItem("dataUser"));
  const isAdmin = user?.role === "admin";
  return (
    <Router>
      <Routes>
        {/* Các route dành cho admin */}
        {isAdmin && <Route path="/admin/*" element={<LayoutAdmin />} />}
        {/* Các route dành cho user */}
        <Route path="/*" element={<UserLayout />}>
          {/* Sử dụng index route cho trang chủ */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    // {/* Sửa signUp thành SignUp */}
  );
}

export default App;
