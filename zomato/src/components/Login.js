// import React, { useState } from "react";
// import { Container, Form, Button, Modal, Card, Row, Col, Toast, ToastContainer } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [lengthOk, setLengthOk] = useState(false);
//   const [uppercaseOk, setUppercaseOk] = useState(false);
//   const [specialOk, setSpecialOk] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");
//   const [toastType, setToastType] = useState("success"); // success or danger
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const validatePassword = (pwd) => {
//     if (pwd.length < 8) return "Password must be at least 8 characters long.";
//     if (!/[A-Z]/.test(pwd)) return "Password must contain at least one uppercase letter.";
//     if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) return "Password must contain at least one special character.";
//     return "";
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const error = validatePassword(password);
//     if (error) {
//       setPasswordError(error);
//       return;
//     }
//     setPasswordError("");
//     if (login(emailOrPhone, password)) {
//       setToastMessage("Successfully logged in!");
//       setToastType("success");
//       setShowToast(true);
//       setTimeout(() => {
//         navigate('/restaurants');
//       }, 2000); 
//     } else {
//       setToastMessage("Invalid email or password!");
//       setToastType("danger");
//       setShowToast(true);
//     }
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
//                 <p className="text-muted">Welcome back! Please Login to your account.</p>
//               </div>
//               <Form onSubmit={handleLogin}>
//                 <Form.Group className="mb-3" controlId="emailOrPhone">
//                   <Form.Label className="fw-semibold">Email or Phone Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter email or phone"
//                     value={emailOrPhone}
//                     onChange={(e) => setEmailOrPhone(e.target.value)}
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
//                       const pwd = e.target.value;
//                       setPassword(pwd);
//                       if (passwordError) setPasswordError("");
//                       setLengthOk(pwd.length >= 8);
//                       setUppercaseOk(/[A-Z]/.test(pwd));
//                       setSpecialOk(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd));
//                     }}
//                     required
//                     className="form-control-lg"
//                     style={{ borderRadius: '10px' }}
//                     isInvalid={!!passwordError}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {passwordError}
//                   </Form.Control.Feedback>
                 
//                 </Form.Group>
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <Button as={Link} to="/signup" variant="link" className="text-danger p-0 text-decoration-none">
//                     Sign Up
//                   </Button>
//                   <Button variant="link" onClick={handleForgotPassword} className="text-danger p-0 text-decoration-none">
//                     Forgot Password?
//                   </Button>
//                 </div>
//                 <Button variant="danger" type="submit" className="w-100 py-3 fw-bold" style={{ borderRadius: '10px' }}>
//                   Login
//                 </Button>
//                 <div className="text-center mt-3">
//                   <Button variant="outline-secondary" className="w-100 py-3 fw-bold" style={{ borderRadius: '10px' }}>
//                     Continue with Google
//                   </Button>
//                 </div>
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
//             <strong className="me-auto">Login Status</strong>
//           </Toast.Header>
//           <Toast.Body className="text-white">
//             {toastMessage}
//           </Toast.Body>
//         </Toast>
//       </ToastContainer>
//     </Container>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Container, Card, Form, Button, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_or_phone: emailOrPhone, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToastMessage("Login successful!");
        setShowToast(true);
        setTimeout(() => navigate("/restaurants"), 1500);
      } else {
        setToastMessage(data.message || "Login failed");
        setShowToast(true);
      }
    } catch (err) {
      setToastMessage("Server error, try again.");
      setShowToast(true);
    }
  };

  return (
    <Container className="py-5" style={{ minHeight: "80vh" }}>
      <Card className="mx-auto" style={{ maxWidth: "400px" }}>
        <Card.Body className="p-4">
          <h2 className="text-center text-danger mb-3">Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email or Phone</Form.Label>
              <Form.Control
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100 btn btn-danger">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {showToast && (
        <Toast
          style={{ position: "fixed", top: 20, right: 20 }}
          onClose={() => setShowToast(false)}
          autohide
          delay={3000}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      )}
    </Container>
  );
};

export default Login;
