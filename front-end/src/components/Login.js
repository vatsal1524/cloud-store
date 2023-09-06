import React, { useState } from "react";
import { Form, Button, Container, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/login",
        {
          data: {
            password,
            email,
          },
        }
      );

      if (response.status === 200) {
        navigate("/home", {
          state: response.data,
        });
      } else if (response.status === 401 || response.status === 500) {
        setError(response.data.error);
      }
    } catch (error) {
      setError("Login not successful");
    }
  };

  const handleRegistrationPage = () => {
    navigate("/");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Col xs={12} md={6}>
        <h1 className="text-center">Login</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email" className="mb-3">
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-3">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>
          <div className="button-container">
            <Button variant="primary" type="submit" className="submit-button">
              Submit
            </Button>
            <Button variant="secondary" onClick={handleRegistrationPage}>
              Signup
            </Button>
          </div>
        </Form>
      </Col>
    </Container>
  );
};

export default Login;
