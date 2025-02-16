import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CallLogin } from "../../redux/reducers/auth/login";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await CallLogin(formData);
    if (res && res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Đăng nhập thành công!",
        showConfirmButton: false,
        timer: 3000, // Hiển thị thông báo trong 3 giây
      });
      // Đợi 3 giây trước khi chuyển trang
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi đăng nhập",
        text: "Email hoặc mật khẩu không đúng!",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Đăng Nhập</h2>
      <form onSubmit={handleLogin} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mật khẩu</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Đăng Nhập
        </button>
      </form>
    </div>
  );
}
