// import React, { useState } from "react";
// import { Container, Form, Button, Modal, Card, Row, Col, Alert, Toast, ToastContainer } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from '../context/AuthContext';

// const Signup = () => {
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordErrors, setPasswordErrors] = useState([]);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");
//   const [toastType, setToastType] = useState("success");
//   const navigate = useNavigate();
//   const { signup } = useAuth();

//   const validatePassword = (pwd) => {
//     const errors = [];
//     if (pwd.length < 8) errors.push("At least 8 characters");
//     if (!/[A-Z]/.test(pwd)) errors.push("At least one uppercase letter");
//     if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) errors.push("At least one special character");
//     return errors;
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     const errors = validatePassword(password);
//     setPasswordErrors(errors);
//     if (errors.length > 0) {
//       return;
//     }
//     const userData = { firstName, lastName, phone, email, password };
//     signup(userData);
//     setToastMessage("Account created successfully! Please login.");
//     setToastType("success");
//     setShowToast(true);
//     setTimeout(() => {
//       navigate('/login');
//     }, 2000);
//   };

//   const handleForgotPassword = () => {
//     setShowForgotPassword(true);
//   };

//   const closeForgotPassword = () => {
//     setShowForgotPassword(false);
//   };

//   return (
//     <Container className="py-5" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <Row className="w-100 justify-content-center">
//         <Col md={6} lg={5}>
//           <Card className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
//             <Card.Body className="p-5">
//               <div className="text-center mb-4">
//                 <h2 className="text-danger fw-bold">🍴 Zomato</h2>
//                 <p className="text-muted">Create your account.</p>
//               </div>
//               <Form onSubmit={handleSignup}>
//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-3" controlId="firstName">
//                       <Form.Label className="fw-semibold">First Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="First Name"
//                         value={firstName}
//                         onChange={(e) => setFirstName(e.target.value)}
//                         required
//                         className="form-control-lg"
//                         style={{ borderRadius: '10px' }}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3" controlId="lastName">
//                       <Form.Label className="fw-semibold">Last Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Last Name"
//                         value={lastName}
//                         onChange={(e) => setLastName(e.target.value)}
//                         required
//                         className="form-control-lg"
//                         style={{ borderRadius: '10px' }}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Form.Group className="mb-3" controlId="phone">
//                   <Form.Label className="fw-semibold">Phone Number</Form.Label>
//                   <Form.Control
//                     type="tel"
//                     placeholder="Phone Number"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     required
//                     className="form-control-lg"
//                     style={{ borderRadius: '10px' }}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="email">
//                   <Form.Label className="fw-semibold">Email Address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Email Address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="form-control-lg"
//                     style={{ borderRadius: '10px' }}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="password">
//                   <Form.Label className="fw-semibold">Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                       setPasswordErrors(validatePassword(e.target.value));
//                     }}
//                     required
//                     className="form-control-lg"
//                     style={{ borderRadius: '10px' }}
//                     isInvalid={passwordErrors.length > 0}
//                   />
//                   {passwordErrors.length > 0 && (
//                     <div className="mt-2">
//                       <small className="text-danger">
//                         Password must include:
//                         <ul className="mb-0 mt-1">
//                           {passwordErrors.map((error, index) => (
//                             <li key={index}>{error}</li>
//                           ))}
//                         </ul>
//                       </small>
//                     </div>
//                   )}
//                 </Form.Group>
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <Button variant="link" onClick={() => window.history.back()} className="text-danger p-0 text-decoration-none">
//                     Back to Login
//                   </Button>
//                   <Button variant="link" onClick={handleForgotPassword} className="text-danger p-0 text-decoration-none">
//                     Forgot Password?
//                   </Button>
//                 </div>
//                 <Button variant="danger" type="submit" className="w-100 py-3 fw-bold" style={{ borderRadius: '10px' }}>
//                   Sign Up
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Modal show={showForgotPassword} onHide={closeForgotPassword} centered>
//         <Modal.Header closeButton className="border-0">
//           <Modal.Title className="text-danger fw-bold">Forgot Password</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="px-4">
//           <p className="text-muted mb-4">Enter your email address and we'll send you a link to reset your password.</p>
//           <Form>
//             <Form.Group className="mb-4" controlId="forgotEmail">
//               <Form.Label className="fw-semibold">Email Address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 required
//                 className="form-control-lg"
//                 style={{ borderRadius: '10px' }}
//               />
//             </Form.Group>
//             <Button variant="danger" type="submit" className="w-100 py-3 fw-bold" style={{ borderRadius: '10px' }}>
//               Send Reset Link
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       <ToastContainer position="top-end" className="p-3">
//         <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg={toastType}>
//           <Toast.Header>
//             <strong className="me-auto">Signup Status</strong>
//           </Toast.Header>
//           <Toast.Body className="text-white">
//             {toastMessage}
//           </Toast.Body>
//         </Toast>
//       </ToastContainer>
//     </Container>
//   );
// };

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/signup/", {
        first_name: firstName,
        last_name: lastName,
        username,
        phone,
        email,
        password,
      });

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: "28rem", borderRadius: "1rem" }}>
        <h3 className="text-center mb-3 text-danger fw-bold">Create Account</h3>

        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </Form.Group>

          {error && <p className="text-danger text-center">{error}</p>}

          <Button variant="danger" type="submit" className="w-100 mt-2">
            Sign Up
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-danger fw-semibold">
              Login
            </Link>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default Signup;
