import React, { useEffect, useState } from "react";
import { CallGetAllAuthors } from "../../redux/reducers/author/getAllAuthor";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CallCreateAuthor } from "../../redux/reducers/author/createAuthor";
import Swal from "sweetalert2";
import { CallUpdateAuthor } from "../../redux/reducers/author/updateAuthor";
import { CallDeleteAuthor } from "../../redux/reducers/author/deleteAuthor";
export default function Author() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    date_of_birth: "",
    date_of_death: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setIsEdit(!isEdit);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  //
  const handleShowDelete = (authorId) => {
    setAuthorId(authorId);
    setShowDelete(true);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [authorId, setAuthorId] = useState("");
  const [listAuthor, setListAuthor] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("asc");
  useEffect(() => {
    const fetchAuthor = async () => {
      const result = await CallGetAllAuthors();
      setListAuthor(result.content);
    };
    fetchAuthor();
  }, []);
  /// ngoặc vuông trong useeffect sẽ chứa những giá trị. khi mà giá trị đó thay đổi thì useEffect sẽ được gọi lại

  // console.log(listAuthor);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateAuthor = async (e) => {
    e.preventDefault();
    const result = await CallCreateAuthor(formData);
    if (result.statusCode === 200) {
      setShow(false);
      setFormData({
        name: "",
        bio: "",
        date_of_birth: "",
        date_of_death: "",
      });
      Swal.fire({
        icon: "success",
        title: "Add author",
        text: result.message,
      });
      const updatedList = await CallGetAllAuthors();
      if (updatedList && updatedList.content) {
        setListAuthor(updatedList.content);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "error",
        text: result.message,
      });
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    const result = await CallDeleteAuthor(authorId);
    if (result.statusCode === 200) {
      handleCloseDelete();
      Swal.fire({
        icon: "success",
        title: "Xoá sách thành công!",
        showConfirmButton: false,
        timer: 2000,
      });
      const updatedList = await CallGetAllAuthors();
      if (updatedList && updatedList.content) {
        setListAuthor(updatedList.content);
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

  const handleEdit = (author) => {
    setAuthorId(author._id);
    setIsEdit(true);
    handleShow();
    setFormData({
      name: author.name,
      bio: author.bio,
      date_of_birth: author.date_of_birth,
      date_of_death: author.date_of_death,
    });
  };
  const handleUpdateAuthor = async (e) => {
    e.preventDefault();
    const result = await CallUpdateAuthor(authorId, formData);
    if (result.statusCode === 200) {
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Cập nhật sách thành công!",
        showConfirmButton: false,
        timer: 2000,
      });
      setFormData({
        name: "",
        bio: "",
        date_of_birth: "",
        date_of_death: "",
      });
      const updatedList = await CallGetAllAuthors();
      if (updatedList && updatedList.content) {
        setListAuthor(updatedList.content);
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

  const handleSort = () => {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center">Quản lý Tác Giả</h2>
      <Button variant="primary" onClick={handleShow}>
        Create Author
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEdit ? "Chỉnh sửa Tác Giả" : "Tạo Tác Giả"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={handleCreateAuthor}>
            <Form.Group className="mb-3">
              <Form.Label> Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                name="bio"
                type="text"
                placeholder="Enter Bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>day of birth</Form.Label>ư
              <Form.Control
                name="date_of_birth"
                type="text"
                placeholder="Enter date of birth"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>day of death</Form.Label>
              <Form.Control
                name="date_of_death"
                type="text"
                placeholder="Enter date of death"
                value={formData.date_of_death}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleCreateAuthor}>
            {isEdit ? "Xác Nhận" : "Tạo"}
          </Button>
        </Modal.Footer>
      </Modal>{" "}
      <div className="my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm tác giả..."
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
            <th>ID</th>
            <th>Name</th>
            <th>Bio</th>
            <th>Date of birth</th>
            <th>Date of death</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listAuthor?.map((author, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{author.name}</td>
                <td>{author.bio}</td>
                <td>{author.date_of_birth}</td>
                <td>{author.date_of_death}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(author)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowDelete(author._id)}
                  >
                    Delele
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Bạn có chắc chắn khi tác giả này không ?</Modal.Title>
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
}
