import React, { useState } from "react";
import { Form, Button, Container, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(name, password, email, location);
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/signup",
        {
          data: {
            name,
            password,
            email,
            location,
          },
        }
      );

      if (response.status === 200) {
        navigate("/login");
      } else {
        setError("Signup not successful.");
      }
    } catch (error) {
      setError("Signup not successful.");
    }
  };

  const handleLoginPage = () => {
    navigate("/login");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Col xs={12} md={6}>
        <h1 className="text-center">Signup</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="input-field">
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
          </Form.Group>
          <Form.Group controlId="password" className="input-field">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group controlId="email" className="input-field">
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group controlId="location" className="input-field">
            <Form.Control
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </Form.Group>
          <div className="button-container">
            <Button variant="primary" type="submit" className="submit-button">
              Submit
            </Button>
            <Button variant="secondary" onClick={handleLoginPage}>
              Login
            </Button>
          </div>
        </Form>
      </Col>
    </Container>
  );
};

export default Signup;
