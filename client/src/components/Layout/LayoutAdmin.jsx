// AdminLayout.jsx
import { Routes, Route } from "react-router-dom";
import AuthorManager from "../admin/AuthorManager.jsx";
import BookManager from "../admin/BookManager.jsx";
import DepartmentManager from "../admin/DepartmentManager.jsx";
import MajorManager from "../admin/MajorManager.jsx";
import SubjectManager from "../admin/SubjectManager.jsx";
import UserManager from "../admin/UserManager.jsx";
import AdminNavbar from "./AdminNavbar.jsx";

function AdminLayout() {
  return (
    <div
      className="d-flex h-100"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <AdminNavbar />
      <div className="d-flex p-6 overflow-auto bg-gray-100 w-100">
        <Routes>
          <Route path="authors" element={<AuthorManager />} />
          <Route path="books" element={<BookManager />} />
          <Route path="departments" element={<DepartmentManager />} />
          <Route path="majors" element={<MajorManager />} />
          <Route path="subjects" element={<SubjectManager />} />
          <Route path="users" element={<UserManager />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminLayout;
