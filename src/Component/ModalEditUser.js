import "../CSS/Modals.css";
import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { UpdateUser } from "../Service/Api";
import { ThemeContext } from "../Contexts/ThemeContext";
import { DataContext } from "../Contexts/DataContext";

export default function ModalEditUser({ show, onHide, user, reloadUsers }) {
  const {
    id,
    setId,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    gender,
    setGender,
    image,
    setImage,
  } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const [role, setRole] = useState("");
  const token = localStorage.getItem("token");

  const textColorClass = theme === "dark" ? "text-light" : "text-dark";
  const bgClass = theme === "dark" ? "bg-dark" : "bg-light";

  useEffect(() => {
    setEmail(user?.Email || "");
    setName(user?.Name || "");
    setPassword("");
    setImage(user?.Image || "");
    setGender(user?.Gender || "");
    setId(user?.ID || "");
    setRole(user?.Role || "");
  }, [user]);

  const handleSubmit = async () => {
    try {
      if (user) {
        await UpdateUser(token, id, image, name, email, password, gender, role);
      }
      reloadUsers();
      onHide();
    } catch (error) {
      alert("Failed to save user:", error);
    }
  };

  return (
    <Modal
      size="lg"
      radius="40px"
      show={show}
      onHide={onHide}
      dialogClassName={bgClass}
    >
      <Modal.Header
        closeButton
        className={`${textColorClass} ${bgClass} border-0 `}
      >
        <h4 className="ms-3">{name}</h4>
      </Modal.Header>
      <Modal.Body className={`${textColorClass} ${bgClass} p-4 pt-3 `}>
        <Form className={`${textColorClass} ${bgClass}`}>
          <Row>
            <Col>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${textColorClass} ${bgClass}`}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="gender" className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={`${textColorClass} ${bgClass}`}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  readOnly={!!user}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${textColorClass} ${bgClass}`}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${textColorClass} ${bgClass}`}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="imgProfile">
                <Form.Label>Image Profile</Form.Label>
                <Form.Control
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className={`${textColorClass} ${bgClass}`}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="role" className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`${textColorClass} ${bgClass}`}
                >
                  <option value="Guest">Guest</option>
                  <option value="Business">Business</option>
                  <option value="Admin">Admin</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <p className="text-secondary position-absolute bottom-0 end-0 me-4 mb-4 pb-2">
          ID: {id}
        </p>
        <Button className="rounded-3 mt-3" variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          className="ms-2 rounded-3 mt-3"
          variant="primary"
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </Modal.Body>
    </Modal>
  );
}
