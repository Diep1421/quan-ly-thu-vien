import React from "react";
import NavBar from "../pages/Navbar";
import Footer from "../pages/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
