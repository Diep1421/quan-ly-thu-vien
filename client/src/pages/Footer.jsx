import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">
          &copy; 2025 Thư viện trực tuyến. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-gray-400 transition">
            Điều khoản
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            Chính sách bảo mật
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            Liên hệ
          </a>
        </div>
      </div>
    </footer>
  );
}
