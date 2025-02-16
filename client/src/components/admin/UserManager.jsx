import React, { useEffect, useState } from "react";
import { CallGetAllUsers } from "../../redux/reducers/user/getAllUsers";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CallCreateUser } from "../../redux/reducers/user/createUser";
import Swal from "sweetalert2";
import { CallUpdateUser } from "../../redux/reducers/user/updateUser";
import { CallDeleteUser } from "../../redux/reducers/user/deleteUser";
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
  const handleShowDelete = (userId) => {
    setUserId(userId);
    setShowDelete(true);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [userId, setUserId] = useState("");
  const [listUser, setListUser] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("asc");
  useEffect(() => {
    const fetchUser = async () => {
      const result = await CallGetAllUsers();
      setListUser(result.content);
    };
    fetchUser();
  }, []);
  /// ngoặc vuông trong useeffect sẽ chứa những giá trị. khi mà giá trị đó thay đổi thì useEffect sẽ được gọi lại

  // console.log(listUser);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateUser = async (e) => {
    e.preventDefault();
    const result = await CallCreateUser(formData);
    if (result.statusCode === 200) {
      setShow(false);
      setFormData({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });
      Swal.fire({
        icon: "success",
        title: "Add user",
        text: result.message,
      });
      const updatedList = await CallGetAllUsers();
      if (updatedList && updatedList.content) {
        setListUser(updatedList.content);
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
    const result = await CallDeleteUser(userId);
    if (result.statusCode === 200) {
      handleCloseDelete();
      Swal.fire({
        icon: "success",
        title: "Xoá user thành công!",
        showConfirmButton: false,
        timer: 2000,
      });
      const updatedList = await CallGetAllUsers();
      if (updatedList && updatedList.content) {
        setListUser(updatedList.content);
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

  const handleEdit = (user) => {
    setUserId(user._id);
    setIsEdit(true);
    handleShow();
    setFormData({
      username: user.username,
      first_name: user.first_name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      role: user.role,
    });
  };
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const result = await CallUpdateUser(userId, formData);
    if (result.statusCode === 200) {
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Cập nhật sách thành công!",
        showConfirmButton: false,
        timer: 2000,
      });
      setFormData({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });
      const updatedList = await CallGetAllUsers();
      if (updatedList && updatedList.content) {
        setListUser(updatedList.content);
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
      <h2 className="text-center">Quản lý User</h2>
      <Button variant="primary" onClick={handleShow}>
        Create User
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Chỉnh sửa User" : "Tạo U  ser"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={handleCreateUser}>
            <Form.Group className="mb-3">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3">
              <Form.Label>first_name</Form.Label>
              <Form.Control
                name="first_name"
                type="text"
                placeholder="Enter first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3">
              <Form.Label>last_name</Form.Label>
              <Form.Control
                name="last_name"
                type="text"
                placeholder="Enter last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>email</Form.Label>
              <Form.Control
                name="email"
                type="Email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>confirm password</Form.Label>
              <Form.Control
                name="comfirmpassword"
                type="password"
                placeholder="Enter comfirmpassword"
                value={formData.comfirmpassword}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>phone</Form.Label>
              <Form.Control
                name="phone"
                type="number"
                placeholder="Enter phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>role</Form.Label>
              <Form.Control
                name="role"
                type="text"
                placeholder="Enter role"
                value={formData.role}
                onChange={handleChange}
              />
              <option value="">Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleCreateUser}>
            {isEdit ? "Xác Nhận" : "Tạo"}
          </Button>
        </Modal.Footer>
      </Modal>{" "}
      <div className="my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm User..."
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
            <th>User Name</th>
            <th>first name</th>
            <th>last name</th>
            <th>email</th>
            <th>phone</th>
            <th>role</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listUser?.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>

                <td>
                  <Button variant="warning" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowDelete(user._id)}
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
          <Modal.Title>Bạn có chắc chắn khi xoá Ngành này không ?</Modal.Title>
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
