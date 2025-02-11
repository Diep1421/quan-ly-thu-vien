import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CallSignUp } from "../redux/reducers/auth/signUp"; // Đảm bảo CallSignUp đã được import đúng

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "", // Thêm số điện thoại
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu nhập lại
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Mật khẩu không khớp!",
      });
      return;
    }

    try {
      const res = await CallSignUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone, // Gửi thông tin số điện thoại
      });

      if (res?.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Đăng ký thành công!",
          showConfirmButton: false,
          timer: 3000, // Thông báo thành công trong 3 giây
        });

        setTimeout(() => {
          navigate("/login"); // Chuyển hướng đến trang đăng nhập
        }, 3000);
      } else {
        throw new Error(res?.message || "Đăng ký thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi đăng ký",
        text: error.message || "Có lỗi xảy ra, vui lòng thử lại!",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Đăng Ký</h2>
      <form onSubmit={handleSignUp} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Họ và Tên</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="mb-3">
          <label className="form-label">Xác nhận mật khẩu</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Đăng Ký
        </button>
      </form>
    </div>
  );
}
