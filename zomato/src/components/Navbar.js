import React from "react";
import { Link } from "react-router-dom";
import { Navbar as BSNavbar, Container, Nav, Badge } from "react-bootstrap";
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useCart();
  return (
     <BSNavbar bg="danger" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <BSNavbar.Brand as={Link} to="/">
          🍴 Zomato
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
           <Nav.Link as={Link} to="/" className="text-white-50000">Home</Nav.Link>
           <Nav.Link as={Link} to="/login" className="text-white-50000">Login</Nav.Link>
           <Nav.Link as={Link} to="/restaurants" className="text-white-50000">Restaurants</Nav.Link>
           <Nav.Link as={Link} to="/cart" className="text-white-50">
             Cart <Badge bg="secondary">{cart.length}</Badge>
           </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};
export default Navbar;