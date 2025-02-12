import React, { useEffect, useState } from "react";
import { CallGetAllAuthors } from "../redux/reducers/author/getAllAuthor";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { CallCreateAuthor } from "../redux/reducers/author/createAuthor";
import Swal from "sweetalert2";
export default function Author() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    date_of_birth: "",
    date_of_death: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [listAuthor, setListAuthor] = useState([]);
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
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create Author
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
            Create
          </Button>
        </Modal.Footer>
      </Modal>{" "}
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
                <td>{author._id}</td>
                <td>{author.name}</td>
                <td>{author.bio}</td>
                <td>{author.date_of_birth}</td>
                <td>{author.date_of_death}</td>
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
