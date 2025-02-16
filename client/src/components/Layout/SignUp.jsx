import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CallSignUp } from "../../redux/reducers/auth/signUp"; // Đảm bảo CallSignUp đã được import đúng

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "", // Thêm số điện thoại
    role: "",
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
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        confirmpassword: formData.confirmpassword,
        phone: formData.phone, // Gửi thông tin số điện thoại
        role: formData.role,
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
          <label className="form-label">User Name</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">first_name</label>
          <input
            type="text"
            name="first_name"
            className="form-control"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">last_name</label>
          <input
            type="text"
            name="last_name"
            className="form-control"
            value={formData.last_name}
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
