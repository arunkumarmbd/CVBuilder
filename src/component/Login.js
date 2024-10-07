import React, { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import userData from "../data/userData.json";
import '../assets/style.css';
import { useNavigate } from 'react-router-dom';

export default function Login({setUpdatingComponent}) {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [allUserData, setAllUserData] = useState(userData);

  const loginUser = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!email) {
      setEmailError("Please enter your email.");
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email address.");
        valid = false;
      }
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      valid = false;
    }

    if (valid) {
      const user = allUserData.find(user => user.email === email && user.password === password);
      if (!user) {
        return alert("Invalid email or password");
      } 
      localStorage.setItem("adminUser", JSON.stringify(user));
      Navigate("/admin");
      setUpdatingComponent()
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <>
      <section className='loginSection'>
        <div className='loginWrapper'>
          <Container>
            <Row className='rowCustom'>
              <Col>
                <h1 className="loginTxt">Log In</h1>
                <Form onSubmit={loginUser}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Your Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                        <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
                      </span>
                    </div>
                    {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
}
