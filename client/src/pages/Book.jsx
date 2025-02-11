import React, { useState, useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CallGetALlBooks } from "../redux/reducers/books/getAllBooks";

const BookForm = () => {
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

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("asc");
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await CallGetALlBooks({
          keyword,
          sortBy: "title",
          page,
          limit,
          order,
        });
        setBooks(result.books);
        setLimit(result.limit);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [page, keyword, order, limit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng nhập đầy đủ thông tin!",
      });
      return;
    }

    try {
      //   const res = await CallAddBook(formData);
      //   if (res?.status === 200) {
      //     Swal.fire({
      //       icon: "success",
      //       title: "Sách đã được thêm!",
      //       showConfirmButton: false,
      //       timer: 2000,
      //     });
      //     setFormData({
      //       title: "",
      //       description: "",
      //       published_date: "",
      //       isbn: "",
      //       author: "",
      //       major: "",
      //       subject: "",
      //       department: "",
      //     });
      //   } else {
      //     throw new Error(res?.message || "Có lỗi xảy ra!");
      //   }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi thêm sách",
        text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
      });
    }
  };

  const handleDelete = async (bookId) => {
    // try {
    //   const res = await CallDeleteBook(bookId);
    //   if (res?.status === 200) {
    //     Swal.fire({
    //       icon: "success",
    //       title: "Sách đã được xóa!",
    //       showConfirmButton: false,
    //       timer: 2000,
    //     });
    //     // Reload book list after delete
    //     setBooks(books.filter((book) => book.id !== bookId));
    //   } else {
    //     throw new Error("Không thể xóa sách.");
    //   }
    // } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Lỗi xóa sách",
    //     text: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
    //   });
    // }
  };

  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      description: book.description,
      published_date: book.published_date,
      isbn: book.isbn,
      author: book.author,
      major: book.major,
      subject: book.subject,
      department: book.department,
    });
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
    <div className="container mt-5">
      <h2 className="text-center">Quản lý sách</h2>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <Form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Tiêu đề</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ngày xuất bản</label>
          <input
            type="date"
            name="published_date"
            className="form-control"
            value={formData.published_date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">ISBN</label>
          <input
            type="text"
            name="isbn"
            className="form-control"
            value={formData.isbn}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tác giả</label>
          <input
            type="text"
            name="author"
            className="form-control"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Thêm sách
        </button>
      </Form>
      <div className="my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm sách..."
          value={keyword}
          onChange={handleSearch}
        />
      </div>
      <Button variant="info" onClick={handleSort} className="mb-3">
        Sắp xếp theo tên ({order === "asc" ? "Tăng dần" : "Giảm dần"})
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Tác giả</th>
            <th>Ngày xuất bản</th>
            <th>ISBN</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published_date}</td>
              <td>{book.isbn}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(book)}>
                  Sửa
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(book.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Phân trang */}
      <div className="d-flex justify-content-between">
        <Button
          variant="secondary"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Trước
        </Button>
        <span>
          Trang {page} / {limit}
        </span>
        <Button
          variant="secondary"
          disabled={page === limit}
          onClick={() => handlePageChange(page + 1)}
        >
          Sau
        </Button>
      </div>
    </div>
  );
};

export default BookForm;
