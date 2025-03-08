import React from "react";

function ModalDelete({
  isOpenModalDelete,
  setIsOpenModalDelete,
  handleSubmitDelete,
}) {
  if (!isOpenModalDelete) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setIsOpenModalDelete(false)}
        ></div>
        {/* Modal content */}
        <div className="bg-white rounded-lg shadow-lg relative z-10 w-full max-w-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Xác nhận xóa
          </h3>
          <p className="text-gray-600 mb-6">
            Bạn có chấc chắn muốn xóa Khoa này không?
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpenModalDelete(false)}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSubmitDelete}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
