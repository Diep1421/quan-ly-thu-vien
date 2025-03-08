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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng Nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
          >
            Đăng Nhập
          </button>
          <p className="text-center text-gray-600 mt-4">
            Bạn chưa có tài khoản? <a href="/signup">Đăng ký ngay</a>
          </p>
        </form>
      </div>
    </div>
  );
}
