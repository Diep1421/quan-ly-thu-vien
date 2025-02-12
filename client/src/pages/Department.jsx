import React, { useEffect, useState } from "react";
import { CallGetAllDepartments } from "../redux/reducers/department/getAllDepartments";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { CallCreateDepartment } from "../redux/reducers/department/createDepartment";
import Swal from "sweetalert2";
export default function Department() {
  const [formData, setFormData] = useState({
    name: "",

    description: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [listDepartment, setListDepartment] = useState([]);
  useEffect(() => {
    const fetchDepartment = async () => {
      const result = await CallGetAllDepartments();
      setListDepartment(result.content);
    };
    fetchDepartment();
  }, []);
  /// ngoặc vuông trong useeffect sẽ chứa những giá trị. khi mà giá trị đó thay đổi thì useEffect sẽ được gọi lại

  // console.log(listDepartment);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateDepartment = async (e) => {
    e.preventDefault();
    const result = await CallCreateDepartment(formData);
    if (result.statusCode === 200) {
      setShow(false);
      setFormData({
        name: "",
        description: "",
      });
      Swal.fire({
        icon: "success",
        title: "Add Department",
        text: result.message,
      });
      const updatedList = await CallGetAllDepartments();
      if (updatedList && updatedList.content) {
        setListDepartment(updatedList.content);
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
        Create Department
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={handleCreateDepartment}>
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
          <Button
            variant="primary"
            type="submit"
            onClick={handleCreateDepartment}
          >
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
          {listDepartment?.map((department, index) => {
            return (
              <tr key={index}>
                <td>{department.name}</td>
                <td>{department.description}</td>
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
