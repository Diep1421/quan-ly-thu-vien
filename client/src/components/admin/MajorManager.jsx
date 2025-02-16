import React, { useEffect, useState } from "react";
import { CallGetAllMajors } from "../../redux/reducers/major/getAllMajors";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CallCreateMajor } from "../../redux/reducers/major/createMajor";
import Swal from "sweetalert2";
import { CallUpdateMajor } from "../../redux/reducers/major/updateMajor";
import { CallDeleteMajor } from "../../redux/reducers/major/deleteMajor";
export default function Major() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
  const handleShowDelete = (majorId) => {
    setMajorId(majorId);
    setShowDelete(true);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [majorId, setMajorId] = useState("");
  const [listMajor, setListMajor] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("asc");
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
        title: "Add major",
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
  const handleDelete = async (e) => {
    e.preventDefault();
    const result = await CallDeleteMajor(majorId);
    if (result.statusCode === 200) {
      handleCloseDelete();
      Swal.fire({
        icon: "success",
        title: "Xoá sách thành công!",
        showConfirmButton: false,
        timer: 2000,
      });
      const updatedList = await CallGetAllMajors();
      if (updatedList && updatedList.content) {
        setListMajor(updatedList.content);
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

  const handleEdit = (major) => {
    setMajorId(major._id);
    setIsEdit(true);
    handleShow();
    setFormData({
      name: major.name,
      description: Major.description,
    });
  };
  const handleUpdateMajor = async (e) => {
    e.preventDefault();
    const result = await CallUpdateMajor(majorId, formData);
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
        description: "",
      });
      const updatedList = await CallGetAllMajors();
      if (updatedList && updatedList.content) {
        setListMajor(updatedList.content);
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
      <h2 className="text-center">Quản lý Ngành</h2>
      <Button variant="primary" onClick={handleShow}>
        Create Major
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Chỉnh sửa Ngành" : "Tạo Ngành"}</Modal.Title>
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
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Enter Description"
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
            {isEdit ? "Xác Nhận" : "Tạo"}
          </Button>
        </Modal.Footer>
      </Modal>{" "}
      <div className="my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm Ngành..."
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
            <th>Description</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listMajor?.map((major, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{major.name}</td>
                <td>{major.description}</td>

                <td>
                  <Button variant="warning" onClick={() => handleEdit(major)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowDelete(major._id)}
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
