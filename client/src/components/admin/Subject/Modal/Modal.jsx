import React from "react";

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  formData,
  handleChange,
  handleSubmit,
  isEdit,
  setIsEdit,
  handleResetForm,
}) => {
  return (
    <div
      id="createSubjectModal"
      tabIndex="-1"
      aria-hidden={!isModalOpen}
      className={`${
        isModalOpen ? "fixed inset-0 z-50 overflow-y-auto" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Overlay có thể đóng modal khi click */}
        <div
          className="fixed inset-0 bg-black opacity-50"
          aria-hidden={!isModalOpen}
          onClick={() => setIsModalOpen(false)}
        ></div>
        {/* Modal content */}
        <div className="bg-white rounded-lg shadow-lg relative z-10 w-[1000px] p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              {isEdit ? "Chỉnh Sửa" : "Tạo Môn"}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setIsEdit(false);
                handleResetForm();
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Tên Môn</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Mô tả</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEdit(false);
                  handleResetForm();
                }}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
              >
                {isEdit ? "Cập nhật" : "Thêm Môn"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
