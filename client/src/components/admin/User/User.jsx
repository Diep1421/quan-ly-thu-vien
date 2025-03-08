import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { CallUpdateUser } from "../../../redux/reducers/user/updateUser";
import { CallGetAllUsers } from "../../../redux/reducers/user/getAllUsers";
import { CallCreateUser } from "../../../redux/reducers/user/createUser";
import { CallDeleteUser } from "../../../redux/reducers/user/deleteUser";
import Modal from "./Modal/Modal";
import ModalDelete from "./Modal/ModalDelete";

export default function User() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("username");
  const [keyword, setKeyword] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const listUsers = useSelector((state) => state.getAllUsers.listUsers);

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const dispatch = useDispatch();
  const handleEdit = (user) => {
    setIsEdit(true);
    setIsModalOpen(true);
    setFormData({
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      role: user.role,
    });
    setIdUser(user._id);
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
      !formData.username ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.role
    ) {
      Swal.fire({
        icon: "error",
        title: "Thông tin không hợp lệ",
        text: "Vui lòng nhập đầy đủ thông tin.",
      });
      return;
    }
    if (isEdit) {
      // Gọi API cập nhật Người dùng
      try {
        const res = await CallUpdateUser(idUser, formData);
        if (res?.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Cập nhật Người dùng thành công!",
            showConfirmButton: false,
            timer: 2000,
          });
          handleResetForm();
          await dispatch(
            CallGetAllUsers({
              keyword: keyword || "",
              sortBy: sortBy || "username",
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
          text:
            error.message || "Cập nhật Người dùng thất bại, vui lòng thử lại.",
        });
      }
    } else {
      try {
        const res = await CallCreateUser(formData);
        console.log(res);

        if (res?.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Người dùng đã được thêm",
            showConfirmButton: false,
            timer: 2000,
          });
          handleResetForm();
          await dispatch(
            CallGetAllUsers({
              keyword,
              sortBy: sortBy || "username",
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
          title: "Lỗi thêm Người dùng!",
          text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
        });
      }
    }
  };
  // Gọi API lấy danh sách Người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(
        CallGetAllUsers({
          keyword,
          sortBy: sortBy || "username",
          page,
          limit,
          order,
        })
      );
    };
    fetchUsers();
  }, [page, keyword, limit, order]);
  // Hàm xử lý khi người dùng ấn nút xóa Người dùng
  const handleOpenModalDelete = async (userId) => {
    setIsOpenModalDelete(true);
    setIdUser(userId);
  };
  // Hàm xử lý khi người dùng ấn nút xác nhận xóa Người dùng
  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await CallDeleteUser(idUser);
      if (res?.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Người dùng đã được xóa!",
          showConfirmButton: false,
          timer: 2000,
        });
        await dispatch(
          CallGetAllUsers({
            keyword,
            sortBy: sortBy || "username",
            page,
            limit,
            order,
          })
        );
        setIsOpenModalDelete(false);
      } else {
        throw new Error("Không thể xóa Người dùng.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi xóa Người dùng!",
        text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
      });
    }
  };
  // Hàm xử lý reset form khi đóng modal, tạo thành công hoặc cập nhật thành công
  const handleResetForm = () => {
    setFormData({
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      role: "",
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
          Quản lý Người dùng
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
          Tạo Người dùng
        </button>
      </header>
      {/* Thanh tìm kiếm và sắp xếp */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm Người dùng ..."
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
              setSortBy(e.target.value);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
          >
            <option value="username">Sắp xếp theo</option>
            <option value="username">Username</option>
            <option value="first_name">First</option>
            <option value="last_name">Last name</option>
            <option value="email">Email</option>
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
                Tên Người dùng
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listUsers?.result?.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.first_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleOpenModalDelete(user._id)}
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
          Trang {page} / {listUsers?.totalPages}
        </span>
        <button
          disabled={page === listUsers?.totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sau
        </button>
      </div>
      {/* Modal Tạo Người dùng */}
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
