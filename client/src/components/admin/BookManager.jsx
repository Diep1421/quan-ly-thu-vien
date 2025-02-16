import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CallGetALlBooks } from "../../redux/reducers/books/getAllBooks";
import { CallGetAllAuthors } from "../../redux/reducers/author/getAllAuthor";
import { CallGetAllMajors } from "../../redux/reducers/major/getAllMajors";
import { CallGetAllDepartments } from "../../redux/reducers/department/getAllDepartments";
import { CallGetAllSubjects } from "../../redux/reducers/subject/getAllSubjects";
import { CallCreateBook } from "../../redux/reducers/books/createBook";
import { CallUpdateBook } from "../../redux/reducers/books/updateBook";
import { CallDeleteBook } from "../../redux/reducers/books/deleteBook";

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
  // biến của modal create và edit
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setIsEdit(!isEdit);
    setShow(false);
  };
  //
  const handleShow = () => setShow(true);
  // biến của modal delete

  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  //
  const handleShowDelete = (bookId) => {
    setBookId(bookId);
    setShowDelete(true);
  };
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [majors, setMajors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("asc");
  const [isEdit, setIsEdit] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bookId, setBookId] = useState("");
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const result = await CallGetALlBooks({
          keyword,
          sortBy: "title",
          page,
          limit,
          order,
        });
        setTotalPages(result.totalPages);
        setBooks(result.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [page, keyword, order, limit]); // Giữ những biến liên quan đến việc fetch sách
  // ⚠️ Chỉ giữ những biến làm thay đổi API
  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const authors = await CallGetAllAuthors();
        const majors = await CallGetAllMajors();
        const subjects = await CallGetAllSubjects();
        const departments = await CallGetAllDepartments();
        setAuthors(authors.content);
        setSubjects(subjects.content);
        setMajors(majors.content);
        setDepartments(departments.content);
      } catch (error) {
        console.error("Error fetching static data:", error);
      }
    };
    fetchStaticData();
  }, []); // Chỉ gọi một lần khi component mount

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateBook = async (e) => {
    e.preventDefault();
    const result = await CallCreateBook(formData);
    if (result.statusCode === 200) {
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Sách đã được thêm!",
        showConfirmButton: false,
        timer: 2000,
      });

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
      const updatedList = await CallGetALlBooks({
        keyword,
        sortBy: "title",
        page,
        limit,
        order,
      });
      if (updatedList && updatedList.content) {
        setBooks(updatedList.books);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: result?.response.data.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const result = await CallDeleteBook(bookId);
    if (result.statusCode === 200) {
      handleCloseDelete();
      Swal.fire({
        icon: "success",
        title: "Xoá sách thành công!",
        showConfirmButton: false,
        timer: 2000,
      });
      const updatedList = await CallGetALlBooks({
        keyword,
        sortBy: "title",
        page,
        limit,
        order,
      });
      if (updatedList && updatedList.content) {
        setBooks(updatedList.books);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: result?.response.data.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleEdit = (book) => {
    setBookId(book._id);
    setIsEdit(true);
    handleShow();
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
  };
  const handleUpdateBook = async (e) => {
    e.preventDefault();
    const result = await CallUpdateBook(bookId, formData);
    if (result.statusCode === 200) {
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Cập nhật sách thành công!",
        showConfirmButton: false,
        timer: 2000,
      });

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
      const updatedList = await CallGetALlBooks({
        keyword,
        sortBy: "title",
        page,
        limit,
        order,
      });
      if (updatedList && updatedList.content) {
        setBooks(updatedList.books);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: result?.response.data.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const handlePageChange = (page) => {
    if (page <= totalPages) {
      setPage(page);
    }
  };

  return (
    <div className="container mt-5">
      {loading && <div>Loading</div>}
      <h2 className="text-center">Quản lý sách</h2>
      <Button variant="primary" onClick={handleShow}>
        Tạo sách
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Chỉnh sửa sách" : "Tạo sách"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateBook}>
            <Form.Group className="mb-3">
              <Form.Label> Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3">
              <Form.Label>description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>published_date</Form.Label>
              <Form.Control
                name="published_date"
                type="date"
                placeholder="Enter published_date"
                value={formData.published_date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>isbn</Form.Label>
              <Form.Control
                name="isbn"
                type="number"
                placeholder="Enter isbn"
                value={formData.isbn}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Select
                name="author"
                placeholder="Enter Author"
                value={formData.author}
                onChange={handleChange}
              >
                <option value="">Chọn tác giả</option>
                {authors?.map((author) => (
                  <option key={author._id} value={author._id}>
                    {author.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>major</Form.Label>
              <Form.Select
                name="major"
                placeholder="Enter major"
                value={formData.major}
                onChange={handleChange}
              >
                <option value="">Chọn ngành</option>

                {majors?.map((major) => (
                  <option key={major._id} value={major._id}>
                    {major.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>department</Form.Label>
              <Form.Select
                name="department"
                placeholder="Enter department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Chọn khoa</option>

                {departments?.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>subject</Form.Label>
              <Form.Select
                name="subject"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="">Chọn môn</option>

                {subjects?.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={isEdit ? handleUpdateBook : handleCreateBook}
          >
            {isEdit ? "Cập nhật" : "Tạo mới"}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm sách..."
          value={keyword}
          onChange={handleSearch}
        />
      </div>
      <Form.Select
        name="sort"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        className="my-2"
      >
        <option value="asc">sắp xếp tăng dần</option>
        <option value="desc">sắp xếp giảm dần</option>
      </Form.Select>
      <Form.Select
        name="limit"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        className="my-2"
      >
        <option value="1">1</option>
        <option value="10">10</option>
        <option value="5">5</option>
        <option value="20">20</option>
      </Form.Select>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Tác giả</th>
            <th>Môn</th>
            <th>Ngành</th>
            <th>Khoa</th>
            <th>Ngày xuất bản</th>
            <th>ISBN</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {books?.map(
            (book, index) => (
              console.log(book),
              (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author?.name}</td>
                  <td>{book.subject?.name}</td>
                  <td>{book.major?.name}</td>
                  <td>{book.department?.name}</td>
                  <td>{book.published_date}</td>
                  <td>{book.isbn}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(book)}>
                      Sửa
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleShowDelete(book._id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </Table>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Bạn có chắc chắn khi xoá sách này không ?</Modal.Title>
        </Modal.Header>
        <div className="d-grid m-3 p-3 gap-3">
          <Button variant="danger" onClick={handleCloseDelete}>
            Không
          </Button>
          <Button variant="success" onClick={handleDelete}>
            Có
          </Button>
        </div>
      </Modal>
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
          Trang {page} / {totalPages}
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
