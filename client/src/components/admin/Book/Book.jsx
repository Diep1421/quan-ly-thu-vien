import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { CallGetALlBooks } from "../../../redux/reducers/books/getAllBooks";
import { CallGetAllAuthors } from "../../../redux/reducers/author/getAllAuthor";
import { CallGetAllDepartments } from "../../../redux/reducers/department/getAllDepartments";
import { CallGetAllMajors } from "../../../redux/reducers/major/getAllMajors";
import { CallGetAllSubjects } from "../../../redux/reducers/subject/getAllSubjects";
import { CallCreateBook } from "../../../redux/reducers/books/createBook";
import Modal from "./Modal/Modal";
import { CallUpdateBook } from "../../../redux/reducers/books/updateBook";
import ModalDelete from "./Modal/ModalDelete";
import { CallDeleteBook } from "../../../redux/reducers/books/deleteBook";

const BookForm = () => {
  // Khai báo state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    published_date: "",
    isbn: "",
    author: "",
    major: "",
    subject: "",
    department: "",
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("title");
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idBook, setIdBook] = useState("");
  const dispatch = useDispatch();
  const listBooks = useSelector((state) => state.getAllBooks.listBooks);
  const listAuthors = useSelector((state) => state.getAllAuthors.listAuthors);
  const listDepartments = useSelector(
    (state) => state.getAllDepartments.listDepartments
  );
  const listMajors = useSelector((state) => state.getAllMajors.listMajors);
  const listSubjects = useSelector(
    (state) => state.getAllSubjects.listSubjects
  );
  // Gọi API lấy danh sách sách
  useEffect(() => {
    const fetchBooks = async () => {
      await dispatch(
        CallGetALlBooks({
          keyword,
          sortBy: sortBy || "title",
          page,
          limit,
          order,
        })
      );
    };
    fetchBooks();
  }, [page, keyword, order, limit]);
  // Gọi API lấy danh sách tác giả, ngành, Nghành, Môn học
  useEffect(() => {
    const fetch = async () => {
      await dispatch(
        CallGetAllAuthors({
          keyword,
          sortBy: "title",
          page,
          limit,
          order,
        })
      );
      await dispatch(
        CallGetAllDepartments({
          keyword,
          sortBy: "title",
          page,
          limit,
          order,
        })
      );
      await dispatch(
        CallGetAllMajors({
          keyword,
          sortBy: "title",
          page,
          limit,
          order,
        })
      );
      await dispatch(
        CallGetAllSubjects({
          keyword,
          sortBy: "title",
          page,
          limit,
          order,
        })
      );
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // Hàm xử lý khi người dùng ấn nút tạo sách hoặc cập nhật sách
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.author ||
      !formData.major ||
      !formData.subject ||
      !formData.department
    ) {
      Swal.fire({
        icon: "error",
        title: "Thông tin không hợp lệ",
        text: "Vui lòng nhập đầy đủ thông tin.",
      });
      return;
    }
    if (isEdit) {
      // Gọi API cập nhật sách
      try {
        const res = await CallUpdateBook(idBook, formData);
        if (res?.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Cập nhật sách thành công!",
            showConfirmButton: false,
            timer: 2000,
          });
          handleResetForm();
          await dispatch(
            CallGetALlBooks({
              keyword,
              sortBy: "title",
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
          title: "Lỗi cập nhật sách",
          text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
        });
      }
    } else {
      try {
        const res = await CallCreateBook(formData);
        if (res?.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Sách đã được thêm!",
            showConfirmButton: false,
            timer: 2000,
          });
          handleResetForm();
          await dispatch(
            CallGetALlBooks({
              keyword,
              sortBy: "title",
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
          title: "Lỗi thêm sách",
          text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
        });
      }
    }
  };
  // Hàm xử lý khi người dùng ấn nút xóa sách
  const handleOpenModalDelete = async (bookId) => {
    setIsOpenModalDelete(true);
    setIdBook(bookId);
  };
  // Hàm xử lý Khi người dùng ấn nút xác nhận xóa sách
  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await CallDeleteBook(idBook);
      if (res?.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Sách đã được xóa!",
          showConfirmButton: false,
          timer: 2000,
        });
        await dispatch(
          CallGetALlBooks({
            keyword,
            sortBy: "title",
            page,
            limit,
            order,
          })
        );
        setIsOpenModalDelete(false);
      } else {
        throw new Error("Không thể xóa sách.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi xóa sách",
        text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
      });
    }
  };
  // Hàm xử lý reset form khi đóng modal, tạo thành công hoặc cập nhật thành công
  const handleResetForm = () => {
    setFormData({
      title: "",
      description: "",
      published_date: "",
      isbn: "",
      author: "",
      major: "",
      subject: "",
      department: "",
    });
  };
  const handleEdit = (book) => {
    setIsEdit(true);
    setIsModalOpen(true);
    setFormData({
      title: book.title,
      description: book.description,
      published_date: book.published_date,
      isbn: book.isbn,
      author: book.author._id,
      major: book.major._id,
      subject: book.subject._id,
      department: book.department._id,
    });
    setIdBook(book._id);
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const handleSort = () => {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Quản lý sách
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
          Tạo Sách
        </button>
      </header>

      {/* Thanh tìm kiếm và sắp xếp */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm sách..."
          value={keyword}
          onChange={handleSearch}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Dropdown sắp xếp theo tên */}
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
              <option value="name">Tiêu đề Sách</option>
              <option value="description">Mô tả</option>
              <option value="published_date">ngày xuất bản</option>
              <option value="isbn">Mã ISBN</option>
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
      </div>

      {/* Bảng danh sách sách */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Tiêu đề
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Tác giả
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Nganh học
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Môn học
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Khoa
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Ngày xuất bản
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                ISBN
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listBooks?.result?.map((book, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {book.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {book.author.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {book.major.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {book.subject.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {book.department.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {book.published_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {book.isbn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleOpenModalDelete(book._id)}
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

      {/* Phân trang */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Trước
        </button>
        <span className="text-gray-700">
          Trang {page} / {listBooks?.totalPages}
        </span>
        <button
          disabled={page === listBooks?.totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sau
        </button>
      </div>

      {/* Modal Tạo sách */}
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        listAuthors={listAuthors}
        listDepartments={listDepartments}
        listMajors={listMajors}
        listSubjects={listSubjects}
        isEdit={isEdit}
        handleResetForm={handleResetForm}
        setIsEdit={setIsEdit}
      />
      <ModalDelete
        isOpenModalDelete={isOpenModalDelete}
        setIsOpenModalDelete={setIsOpenModalDelete}
        handleSubmitDelete={handleSubmitDelete}
      />
    </div>
  );
};

export default BookForm;
