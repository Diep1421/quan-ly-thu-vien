import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("dataUser");
  const user = userData ? JSON.parse(userData) : null;

  const handleLogout = () => {
    localStorage.removeItem("dataUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        {/* Thương hiệu / logo */}
        <Navbar.Brand as={Link} to="/">
          Quản Lý Thư Viện
        </Navbar.Brand>

        {/* Toggle button cho mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Nội dung Navbar */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/books">
              Sản phẩm sách
            </Nav.Link>
            <Nav.Link as={Link} to="/authors">
              Tác giả
            </Nav.Link>
            <Nav.Link as={Link} to="/departments">
              Khoa
            </Nav.Link>
            <Nav.Link as={Link} to="/majors">
              Ngành
            </Nav.Link>
            <Nav.Link as={Link} to="/subjects">
              Môn
            </Nav.Link>{" "}
            {/* Bạn có thể thêm các link khác tại đây */}
          </Nav>

          <Nav className="ms-auto">
            {user ? (
              <NavDropdown title={user.username} id="user-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/profile">
                  Thông tin cá nhân
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Đăng nhập
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Đăng ký
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;
