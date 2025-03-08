import React, { useState } from "react";

export default function BookRecommendations() {
  const [newBook, setNewBook] = useState({ title: "", description: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newBook.title && newBook.description) {
      alert(`Sách đề xuất: ${newBook.title}\nMô tả: ${newBook.description}`);
      setNewBook({ title: "", description: "" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Đánh Giá Sách</h2>

      <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Phản Hồi Sách</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Tên sách"
            value={newBook.title}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Mô tả"
            value={newBook.description}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
          >
            Gửi Phản Hồi
          </button>
        </form>
      </div>
    </div>
  );
}
