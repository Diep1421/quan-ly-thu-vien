import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

//RequireAuth sẽ kiểm tra xem người dùng đã đăng nhập chưa, nếu chưa thì chuyển hướng về trang đăng nhập
const RequireAuth = () => {
    // Lấy dữ liệu người dùng từ localStorage
    const storedUser = localStorage.getItem("dataUser");
    let dataUser = null;

    try {
        dataUser = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Lỗi khi parse dataUser từ localStorage", error);
        dataUser = null;
    }

    // Kiểm tra nếu người dùng tồn tại và có role là "admin"
    if (dataUser && dataUser.role === "admin") {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default RequireAuth;
