import React, { useState } from "react";

import { CallCreatePropose } from "../../redux/reducers/propose/createPropose";
import Swal from "sweetalert2";
export default function BookRecommendations() {
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await CallCreatePropose(formData);
    if (res?.statusCode === 200) {
      Swal.fire({
        icon: "success",
        title: "Đề Xuất đã được Gửi",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setFormData({ name: "", description: "" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Sách Đề Xuất</h2>

      <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Đề Xuất Sách</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Tên sách"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Mô tả"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
          >
            Gửi Đề Xuất
          </button>
        </form>
      </div>
    </div>
  );
}
