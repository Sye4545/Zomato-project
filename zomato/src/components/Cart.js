// import React, { useState } from 'react';
// import { Container, Button, ListGroup, Row, Col, Card, Toast } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';

// const Cart = () => {
//   const { cart, removeItem, updateQuantity, getTotal, clearCart } = useCart();
//   const { isLoggedIn } = useAuth();
//   const navigate = useNavigate();
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');

//   const showToastMessage = (message) => {
//     setToastMessage(message);
//     setShowToast(true);
//   };

//   const handleCheckout = () => {
//     if (!isLoggedIn) {
//       showToastMessage('You must be logged in to checkout. Redirecting to login page.');
//       navigate('/login');
//     } else {
//       navigate('/payment');
//     }
//   };

//   return (
//     <Container className="py-5">
//       <h2>Your Cart</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <ListGroup variant="flush">
//             {cart.map((item) => (
//               <ListGroup.Item key={item.id}>
//                 <Row className="align-items-center">
//                   <Col md={2}>
//                     <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
//                   </Col>
//                   <Col md={4}>
//                     <h5>{item.name}</h5>
//                     <p>₹{item.price}</p>
//                   </Col>
//                   <Col md={3}>
//                     <div className="d-flex align-items-center">
//                       <Button
//                         variant="outline-secondary"
//                         size="sm"
//                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       >
//                         -
//                       </Button>
//                       <span className="mx-2">{item.quantity}</span>
//                       <Button
//                         variant="outline-secondary"
//                         size="sm"
//                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                       >
//                         +
//                       </Button>
//                     </div>
//                   </Col>
//                   <Col md={2}>
//                     <p>₹{item.price * item.quantity}</p>
//                   </Col>
//                   <Col md={1}>
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => removeItem(item.id)}
//                     >
//                       Remove
//                     </Button>
//                   </Col>
//                 </Row>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//           <div className="mt-4">
//             <h4>Total: ₹{getTotal()}</h4>
//             <Button variant="success" className="me-2" onClick={handleCheckout}>Checkout</Button>
//             <Button variant="secondary" onClick={clearCart}>Clear Cart</Button>
//           </div>
//         </>
//       )}
//       <Toast
//         show={showToast}
//         onClose={() => setShowToast(false)}
//         delay={3000}
//         autohide
//         style={{
//           position: 'fixed',
//           top: 20,
//           right: 20,
//           zIndex: 9999,
//         }}
//       >
//         <Toast.Header>
//           <strong className="me-auto">Notification</strong>
//         </Toast.Header>
//         <Toast.Body>{toastMessage}</Toast.Body>
//       </Toast>
//     </Container>
//   );
// };

// export default Cart;

import React, { useState, useEffect } from "react";
import { Container, Button, ListGroup, Row, Col, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateQuantity = (id, qty) => {
    const newCart = cart.map((item) => (item.id === id ? { ...item, quantity: qty } : item)).filter(i => i.quantity > 0);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const getTotal = () => cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const placeOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setToastMessage("Login required to place order");
      setShowToast(true);
      navigate("/login");
      return;
    }

    const orderData = {
      restaurant: "Zomato Restaurant",
      total_price: getTotal(),
      address: "Hyderabad, India",
      items: cart.map(i => ({ item_id: i.id, quantity: i.quantity })),
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/create-order/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Token ${token}` },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage("Order placed successfully!");
        setShowToast(true);
        clearCart();
        navigate("/restaurants");
      } else {
        setToastMessage(data.message || "Failed to place order");
        setShowToast(true);
      }
    } catch (err) {
      setToastMessage("Server error, try again.");
      setShowToast(true);
    }
  };

  return (
    <Container className="py-5">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <>
          <ListGroup variant="flush">
            {cart.map(item => (
              <ListGroup.Item key={item.id}>
                <Row className="align-items-center">
                  <Col md={4}>{item.name}</Col>
                  <Col md={2}>₹{item.price}</Col>
                  <Col md={3}>
                    <Button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                  </Col>
                  <Col md={2}>₹{item.price * item.quantity}</Col>
                  <Col md={1}>
                    <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>Remove</Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <h4 className="mt-3">Total: ₹{getTotal()}</h4>
          <Button className="me-2" onClick={placeOrder}>Place Order</Button>
          <Button variant="secondary" onClick={clearCart}>Clear Cart</Button>
        </>
      )}

      {showToast && (
        <Toast style={{ position: "fixed", top: 20, right: 20 }} autohide delay={3000} onClose={() => setShowToast(false)}>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      )}
    </Container>
  );
};

export default Cart;
