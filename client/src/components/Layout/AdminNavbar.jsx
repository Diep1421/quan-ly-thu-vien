import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
const AdminNavbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Lấy thông tin người dùng từ localStorage khi component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("dataUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("dataUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: "280px" }}
    >
      {/* Header */}
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
      >
        <svg className="bi me-2" width="40" height="32">
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="fs-4">Quản Lý Thư Viện</span>
      </Link>
      <hr />

      {/* Danh sách menu */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/admin/authors" className="nav-link ">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#person" />
            </svg>
            Quản lý tác giả
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/books" className="nav-link">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#book" />
            </svg>
            Quản lý sách
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/departments" className="nav-link">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#building" />
            </svg>
            Quản lý Khoa
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/majors" className="nav-link">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#mortarboard" />
            </svg>
            Quản lý Ngành
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/subjects" className="nav-link">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#book-half" />
            </svg>
            Quản lý Môn
          </NavLink>
        </li>
        {user?.role === "admin" && (
          <li className="nav-item">
            <NavLink to="/admin/users" className="nav-link">
              <svg className="bi me-2" width="16" height="16">
                <use xlinkHref="#people" />
              </svg>
              Quản lý User
            </NavLink>
          </li>
        )}
      </ul>
      <hr />

      {/* Phần thông tin người dùng */}
      <div className="dropdown">
        <a
          href="#!"
          className="d-flex align-items-center text-decoration-none dropdown-toggle"
          id="dropdownUser"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={`https://ui-avatars.com/api/?name=${user?.username || "User"}`}
            alt="Profile"
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>
            {user ? `Xin Chào ${user.username}` : "Chào mừng, khách"}
          </strong>
        </a>
        <ul
          className="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser"
        >
          {user ? (
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Đăng Xuất
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link className="dropdown-item" to="/login">
                  Đăng Nhập
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/signup">
                  Đăng Ký
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
