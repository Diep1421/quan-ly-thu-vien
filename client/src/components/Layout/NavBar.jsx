import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const userData = JSON.parse(localStorage.getItem("dataUser"));
  const isLoggedIn = userData !== null; // Kiểm tra trạng thái đăng nhập

  const handleLogout = () => {
    localStorage.removeItem("dataUser");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Quản Lý Thư Viện
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav w-100 d-flex justify-content-between align-items-center">
            {/* Menu bên trái */}
            <div className="d-flex">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Trang Chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/book">
                  Sách
                </Link>
              </li>
            </div>

            {/* Avatar hoặc Đăng Nhập/Đăng Ký bên phải */}
            <div>
              {isLoggedIn ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${userData.username}`}
                      alt="Avatar"
                      className="rounded-circle"
                      width="32"
                      height="32"
                    />
                    <span className="ms-2">{userData.username}</span>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Trang cá nhân
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        Đăng Xuất
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <div className="d-flex flex-col">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Đăng Nhập
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Đăng Ký
                    </Link>
                  </li>
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
