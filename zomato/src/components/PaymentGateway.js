import React, { useState } from 'react';
import { Container, Button, Form, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const PaymentGateway = () => {
  const { getTotal, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    contact: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    const options = {
      key: 'rzp_test_RZF7UUDUocNQEv', 
      amount: getTotal() * 100, 
      currency: 'INR',
      name: 'Zomato Clone',
      description: 'Food Order Payment',
      handler: function (response) {
  
        setShowSuccess(true);
        clearCart();
        setTimeout(() => {
          navigate('/');
        }, 3000);
      },
      prefill: {
        name: customerDetails.name,
        email: customerDetails.email,
        contact: customerDetails.contact
      },
      theme: {
        color: '#3399cc'
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <Container className="py-5">
      <h2>Payment Gateway</h2>
      <Card>
        <Card.Body>
          <h4>Total Amount: ₹{getTotal()}</h4>
          {showSuccess ? (
            <Alert variant="success">
              Payment successful! Redirecting to home page...
            </Alert>
          ) : (
            <Form onSubmit={handlePayment}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={customerDetails.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={customerDetails.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="contact"
                  value={customerDetails.contact}
                  onChange={handleInputChange}
                  placeholder="Enter your contact number"
                  required
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Pay Now with Razorpay
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentGateway;
