import React, { useEffect, useState } from "react";
import { CallGetAllSubjects } from "../redux/reducers/subject/getAllSubjects";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { CallCreateSubject } from "../redux/reducers/subject/createSubject";
import Swal from "sweetalert2";
export default function Subject() {
  const [formData, setFormData] = useState({
    name: "",

    description: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [listSubject, setListSubject] = useState([]);
  useEffect(() => {
    const fetchSubject = async () => {
      const result = await CallGetAllSubjects();
      setListSubject(result.content);
    };
    fetchSubject();
  }, []);
  /// ngoặc vuông trong useeffect sẽ chứa những giá trị. khi mà giá trị đó thay đổi thì useEffect sẽ được gọi lại

  // console.log(listSubject);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateSubject = async (e) => {
    e.preventDefault();
    const result = await CallCreateSubject(formData);
    if (result.statusCode === 200) {
      setShow(false);
      setFormData({
        name: "",
        description: "",
      });
      Swal.fire({
        icon: "success",
        title: "Add Subject",
        text: result.message,
      });
      const updatedList = await CallGetAllSubjects();
      if (updatedList && updatedList.content) {
        setListSubject(updatedList.content);
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
        Create Subject
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={handleCreateSubject}>
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
              <Form.Label>description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleCreateSubject}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>{" "}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>DeScription</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listSubject?.map((subject, index) => {
            return (
              <tr key={index}>
                <td>{subject.name}</td>
                <td>{subject.description}</td>
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
