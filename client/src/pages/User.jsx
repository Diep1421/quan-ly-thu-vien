import React, { useEffect, useState } from "react";
import { CallGetAllUsers } from "../redux/reducers/user/getAllUsers";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { CallCreateUser } from "../redux/reducers/user/createUser";
import Swal from "sweetalert2";
export default function User() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [listUser, setListUser] = useState([]);
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
        confirmPassword: "",
        role: "",
      });
      Swal.fire({
        icon: "success",
        title: "Add User",
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
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create User
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
                value={"User"}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleCreateUser}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>{" "}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>UserName</th>
            <th>first_name</th>
            <th>last_name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {listUser?.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.fetchUser}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>

                <td>
                  <button onClick={() => {}}>Edit</button>
                  <button onClick={() => {}}>Delele</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
