  import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext.js';
import { AuthProvider } from './context/AuthContext.js';
import Navbar from "./components/Navbar.js";
import Home from './components/Home.js';
import Restaurants from './components/Restaurant.js';
import RestaurantDetails from './components/RestaurantDetails.js';
import Cart from './components/Cart.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import PaymentGateway from './components/PaymentGateway.js';
import "./App.css";


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/:id" element={<RestaurantDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<PaymentGateway />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
