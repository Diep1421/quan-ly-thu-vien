import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("data");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("data");
    setUser(null);
    navigate("/login");
  };
  return (
    <aside className="bg-gray-800 w-64 h-screen p-6 shadow-lg flex flex-col justify-between">
      {/* Phần menu */}
      <ul className="space-y-4">
        <li>
          <Link
            to="/admin/authors"
            className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-200"
          >
            Quản lý tác giả
          </Link>
        </li>
        <li>
          <Link
            to="/admin/books"
            className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-200"
          >
            Quản lý Sách
          </Link>
        </li>
        <li>
          <Link
            to="/admin/departments"
            className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-200"
          >
            Quản lý Khoa
          </Link>
        </li>
        <li>
          <Link
            to="/admin/majors"
            className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-200"
          >
            Quản lý Ngành
          </Link>
        </li>
        <li>
          <Link
            to="/admin/subjects"
            className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-200"
          >
            Quản lý Môn
          </Link>
        </li>
        {user?.role == "admin" ? (
          <li>
            <Link
              to="/admin/users"
              className="text-white text-lg font-semibold hover:text-yellow-400"
            >
              Quản lý người dùng
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>

      {/* Phần thông tin user */}
      <div className="mt-auto">
        {user ? (
          <div className="text-center">
            <p className="text-white text-lg font-semibold mb-2">
              Xin chào, {user.username}
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Link
              to="/login"
              className="block w-full bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Đăng nhập
            </Link>
            <Link
              to="/signup"
              className="block w-full bg-green-500 text-white text-center py-2 rounded-md hover:bg-green-600 transition duration-200"
            >
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Navbar;
