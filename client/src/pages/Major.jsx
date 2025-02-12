import React, { useEffect, useState } from "react";
import { CallGetAllMajors } from "../redux/reducers/major/getAllMajors";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { CallCreateMajor } from "../redux/reducers/major/createMajor";
import Swal from "sweetalert2";
export default function Major() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [listMajor, setListMajor] = useState([]);
  useEffect(() => {
    const fetchMajor = async () => {
      const result = await CallGetAllMajors();
      setListMajor(result.content);
    };
    fetchMajor();
  }, []);
  /// ngoặc vuông trong useeffect sẽ chứa những giá trị. khi mà giá trị đó thay đổi thì useEffect sẽ được gọi lại

  // console.log(listMajor);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateMajor = async (e) => {
    e.preventDefault();
    const result = await CallCreateMajor(formData);
    if (result.statusCode === 200) {
      setShow(false);
      setFormData({
        name: "",
        description: "",
      });
      Swal.fire({
        icon: "success",
        title: "Add Major",
        text: result.message,
      });
      const updatedList = await CallGetAllMajors();
      if (updatedList && updatedList.content) {
        setListMajor(updatedList.content);
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
        Create Major
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={handleCreateMajor}>
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
          <Button variant="primary" type="submit" onClick={handleCreateMajor}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>DeScription</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listMajor?.map((major, index) => {
            return (
              <tr key={index}>
                <td>{major.name}</td>
                <td>{major.description}</td>
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
