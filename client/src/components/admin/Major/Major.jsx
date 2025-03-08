import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { CallUpdateMajor } from "../../../redux/reducers/major/updateMajor";
import { CallGetAllMajors } from "../../../redux/reducers/major/getAllMajors";
import { CallCreateMajor } from "../../../redux/reducers/major/createMajor";
import { CallDeleteMajor } from "../../../redux/reducers/major/deleteMajor";
import Modal from "./Modal/Modal";
import ModalDelete from "./Modal/ModalDelete";

export default function Major() {
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
  const [idMajor, setIdMajor] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const listMajors = useSelector((state) => state.getAllMajors.listMajors);

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const dispatch = useDispatch();
  const handleEdit = (major) => {
    setIsEdit(true);
    setIsModalOpen(true);
    setFormData({
      name: major.name,
      description: major.description,
    });
    setIdMajor(major._id);
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
    }
    if (isEdit) {
      // Gọi API cập nhật Ngành
      try {
        const res = await CallUpdateMajor(idMajor, formData);
        if (res?.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Cập nhật Ngành thành công!",
            showConfirmButton: false,
            timer: 2000,
          });
          handleResetForm();
          await dispatch(
            CallGetAllMajors({
              keyword: keyword || "",
              sortBy: sortBy || "name",
              page: page || 1,
              limit: limit || 10,
              order: order || "asc",
            })
          );
          setIsModalOpen(false);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: error.message || "Cập nhật Ngành thất bại, vui lòng thử lại.",
        });
      }
    } else {
      try {
        const res = await CallCreateMajor(formData);
        if (res?.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Ngành đã được thêm",
            showConfirmButton: false,
            timer: 2000,
          });
          handleResetForm();
          await dispatch(
            CallGetAllMajors({
              keyword,
              sortBy: "name",
              page,
              limit,
              order,
            })
          );
          setIsModalOpen(false);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi thêm Ngành!",
          text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
        });
      }
    }
  };
  // Gọi API lấy danh sách Ngành
  useEffect(() => {
    const fetchMajors = async () => {
      await dispatch(
        CallGetAllMajors({
          keyword,
          sortBy: "name",
          page,
          limit,
          order,
        })
      );
    };
    fetchMajors();
  }, [page, keyword, limit, order]);
  // Hàm xử lý khi người dùng ấn nút xóa ngành
  const handleOpenModalDelete = async (majorId) => {
    setIsOpenModalDelete(true);
    setIdMajor(majorId);
  };
  // Hàm xử lý khi người dùng ấn nút xác nhận xóa ngành
  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await CallDeleteMajor(idMajor);
      if (res?.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Ngành đã được xóa!",
          showConfirmButton: false,
          timer: 2000,
        });
        await dispatch(
          CallGetAllMajors({
            keyword,
            sortBy: "name",
            page,
            limit,
            order,
          })
        );
        setIsOpenModalDelete(false);
      } else {
        throw new Error("Không thể xóa Ngành.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi xóa Ngành!",
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
          Quản lý Ngành
        </h2>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow"
          onClick={() => setIsModalOpen(true)}
        >
          {/* Icon (tùy chọn) */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Tạo Ngành
        </button>
      </header>
      {/* Thanh tìm kiếm và sắp xếp */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm Ngành ..."
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
            <option value="name">Tên Ngành</option>
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
                Tên Ngành
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
            {listMajors?.result?.map((major, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {major.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {major.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(major)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleOpenModalDelete(major._id)}
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
          Trang {page} / {listMajors?.totalPages}
        </span>
        <button
          disabled={page === listMajors?.totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sau
        </button>
      </div>
      {/* Modal Tạo Ngành */}
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
