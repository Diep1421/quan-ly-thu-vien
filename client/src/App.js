import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Layout/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"; // Đổi signUp thành SignUp
import Book from "./pages/Book";

// import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/book" element={<Book />} />
          {/* Sửa signUp thành SignUp */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
