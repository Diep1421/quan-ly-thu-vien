import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { CallGetAllProposes } from "../../../redux/reducers/propose/getAllProposes";
import { CallDeletePropose } from "../../../redux/reducers/propose/deletePropose";
import Modal from "./Modal/Modal";
import ModalDelete from "./Modal/ModalDelete";

export default function Propose() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const [keyword, setKeyword] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [idPropose, setIdPropose] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const listProposes = useSelector(
    (state) => state.getAllProposes.listProposes
  );

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const dispatch = useDispatch();
  const handleEdit = (propose) => {
    setIsEdit(true);
    setIsModalOpen(true);
    setFormData({
      name: propose.name,
      description: propose.description,
    });
    setIdPropose(propose._id);
  };
  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      Swal.fire({
        icon: "error",
        title: "Thông tin không hợp lệ",
        text: "Vui lòng nhập đầy đủ thông tin.",
      });
      return;
    } else {
      try {
        handleResetForm();
        await dispatch(
          CallGetAllProposes({
            keyword,
            sortBy: "name",
            page,
            limit,
            order,
          })
        );
        setIsModalOpen(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi thêm Đề Xuất!",
          text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
        });
      }
    }
  };
  // Gọi API lấy danh sách Đề Xuất
  useEffect(() => {
    const fetchProposes = async () => {
      await dispatch(
        CallGetAllProposes({
          keyword,
          sortBy: "name",
          page,
          limit,
          order,
        })
      );
    };
    fetchProposes();
  }, [page, keyword, limit, order]);
  // Hàm xử lý khi người dùng ấn nút xóa Đề Xuất
  const handleOpenModalDelete = async (proposeId) => {
    setIsOpenModalDelete(true);
    setIdPropose(proposeId);
  };
  // Hàm xử lý khi người dùng ấn nút xác nhận xóa Đề Xuất
  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await CallDeletePropose(idPropose);
      if (res?.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Đề Xuất đã được xóa!",
          showConfirmButton: false,
          timer: 2000,
        });
        await dispatch(
          CallGetAllProposes({
            keyword,
            sortBy: "name",
            page,
            limit,
            order,
          })
        );
        setIsOpenModalDelete(false);
      } else {
        throw new Error("Không thể xóa Đề Xuất.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi xóa Đề Xuất!",
        text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
      });
    }
  };
  // Hàm xử lý reset form khi đóng modal, tạo thành công hoặc cập nhật thành công
  const handleResetForm = () => {
    setFormData({
      name: "",
      description: "",
    });
  };
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Quản lý Đề Xuất
        </h2>
      </header>
      {/* Thanh tìm kiếm và sắp xếp */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm Đề Xuất ..."
          value={keyword}
          onChange={handleSearch}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div>
          <label className="block text-gray-700 mb-1">Sắp xếp</label>
          <select
            value={order}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
          >
            <option value="asc">Tăng Dần</option>
            <option value="desc">Giảm Dần</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Sắp xếp theo tên</label>
          <select
            value={sortBy}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
          >
            <option value="name">Tên Đề Xuất</option>
            <option value="description">Mô tả</option>
          </select>
        </div>

        {/* Dropdown chọn số lượng bản ghi mỗi trang */}
        <div>
          <label className="block text-gray-700 mb-1">
            Số lượng bản ghi/trang
          </label>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      {/* Dropdown sắp xếp theo tên --- làm sau */}
      {/* Dropdown chọn số lượng bản ghi mỗi trang --- làm sau*/}

      {/* Bảng danh sách sách */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                STT
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Tên Đề Xuất
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Mô Tả
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listProposes?.result?.map((propose, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {propose.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {propose.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModalDelete(propose._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Trước
        </button>
        <span className="text-gray-700">
          Trang {page} / {listProposes?.totalPages}
        </span>
        <button
          disabled={page === listProposes?.totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sau
        </button>
      </div>
      {/* Modal Tạo Đề Xuất */}
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        handleResetForm={handleResetForm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
      <ModalDelete
        isOpenModalDelete={isOpenModalDelete}
        setIsOpenModalDelete={setIsOpenModalDelete}
        handleSubmitDelete={handleSubmitDelete}
      />
    </div>
  );
}
