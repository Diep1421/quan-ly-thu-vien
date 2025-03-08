//File chính --- Quan trọng

import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";
import RequireAuth from "./routes/RequireAuth.jsx";
// import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      {/* Routes của người dùng */}
      <Route path="/*" element={<UserRoutes />} />
      {/* //Routes của admin, khi mà muốn truy cập vào admin nó sẽ chạy element
      RequireAuth trước */}
      <Route element={<RequireAuth />}>
        <Route path="admin/*" element={<AdminRoutes />} />
      </Route>
    </Routes>
  );
}

export default App;
