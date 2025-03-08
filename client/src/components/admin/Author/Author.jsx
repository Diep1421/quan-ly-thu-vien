import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { CallUpdateAuthor } from "../../../redux/reducers/author/updateAuthor";
import { CallGetAllAuthors } from "../../../redux/reducers/author/getAllAuthor";
import { CallCreateAuthor } from "../../../redux/reducers/author/createAuthor";
import { CallDeleteAuthor } from "../../../redux/reducers/author/deleteAuthor";
import Modal from "./Modal/Modal";
import ModalDelete from "./Modal/ModalDelete";

export default function Author() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    date_of_birth: "",
    date_of_death: "",
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("asc");
  const [keyword, setKeyword] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [idAuthor, setIdAuthor] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const listAuthors = useSelector((state) => state.getAllAuthors.listAuthors);

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const dispatch = useDispatch();
  const handleEdit = (author) => {
    setIsEdit(true);
    setIsModalOpen(true);
    setFormData({
      name: author.name,
      bio: author.bio,
      date_of_birth: author.date_of_birth,
      date_of_death: author.date_of_death,
    });
    setIdAuthor(author._id);
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
    if (
      !formData.name ||
      !formData.bio ||
      !formData.date_of_birth ||
      !formData.date_of_death
    ) {
      Swal.fire({
        icon: "error",
        title: "Thông tin không hợp lệ",
        text: "Vui lòng nhập đầy đủ thông tin.",
      });
      return;
    }
    if (isEdit) {
      // Gọi API cập nhật tác giả
      try {
        const res = await CallUpdateAuthor(idAuthor, formData);
        if (res?.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Cập nhật tác giả thành công!",
            showConfirmButton: false,
            timer: 2000,
          });
          handleResetForm();
          await dispatch(
            CallGetAllAuthors({
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
          text: error.message || "Cập nhật tác giả thất bại, vui lòng thử lại.",
        });
      }
    } else {
      try {
        const res = await CallCreateAuthor(formData);
        if (res?.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Tác giả đã được thêm",
            showConfirmButton: false,
            timer: 2000,
          });
          handleResetForm();
          await dispatch(
            CallGetAllAuthors({
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
          title: "Lỗi thêm tác giả!",
          text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
        });
      }
    }
  };
  // Gọi API lấy danh sách tác giả
  useEffect(() => {
    const fetchAuthors = async () => {
      await dispatch(
        CallGetAllAuthors({
          keyword,
          sortBy: "name",
          page,
          limit,
          order,
        })
      );
    };
    fetchAuthors();
  }, [page, keyword, limit, order]);
  // Hàm xử lý khi người dùng ấn nút xóa tác giả
  const handleOpenModalDelete = async (authorId) => {
    setIsOpenModalDelete(true);
    setIdAuthor(authorId);
  };
  // Hàm xử lý khi người dùng ấn nút xác nhận xóa tác giả
  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await CallDeleteAuthor(idAuthor);
      if (res?.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Tác giả đã được xóa!",
          showConfirmButton: false,
          timer: 2000,
        });
        await dispatch(
          CallGetAllAuthors({
            keyword,
            sortBy: "name",
            page,
            limit,
            order,
          })
        );
        setIsOpenModalDelete(false);
      } else {
        throw new Error("Không thể xóa tác giả.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi xóa tác giả!",
        text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
      });
    }
  };
  // Hàm xử lý reset form khi đóng modal, tạo thành công hoặc cập nhật thành công
  const handleResetForm = () => {
    setFormData({
      name: "",
      bio: "",
      date_of_birth: "",
      date_of_death: "",
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
          Quản lý tác giả
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
          Tạo tác giả
        </button>
      </header>
      {/* Thanh tìm kiếm và sắp xếp */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm tác giả ..."
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
          <label className="block text-gray-700 mb-1">Sắp xếp theo</label>
          <select
            value={sortBy}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
          >
            <option value="name">Tên Tác Giả</option>
            <option value="bio">Mô tả</option>
            <option value="date_of_birth">Ngày sinh</option>
            <option value="date_of_death">Ngày Mất</option>
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
                Tên Tác Giả
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Mô Tả
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Ngày Sinh
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Ngày Mất
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listAuthors?.result?.map((author, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {author.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {author.bio}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {author.date_of_birth}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {author.date_of_death}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(author)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleOpenModalDelete(author._id)}
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
          Trang {page} / {listAuthors?.totalPages}
        </span>
        <button
          disabled={page === listAuthors?.totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sau
        </button>
      </div>
      {/* Modal Tạo Tác Giả */}
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
