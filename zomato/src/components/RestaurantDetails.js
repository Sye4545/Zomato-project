import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Button, Row, Col, Card, ListGroup, Toast } from "react-bootstrap";
import { useCart } from '../context/CartContext';

const restaurantData = {
  1: { name: "Bawarchi", cuisine: "Indian", description: "Authentic Hyderabadi Biryani with rich spices.", rating: 4.8 },
  2: { name: "Shah Ghouse", cuisine: "Zafrani", description: "Authentic zafrani Biryani.", rating: 4.7 },
  3: { name: "Shadab ", cuisine: "Hyderabad", description: "Authentic Hyderabadi Biryani with rich spices.", rating: 4.5 },
  4: { name: "Mehfil ", cuisine: "Hyderabad", description: "Authentic Hyderabadi Biryani with rich spices.", rating: 4.6 },
  5: { name: "Pista House ", cuisine: "Hyderabad", description: "Fresh bakes and Zafrani Biryani.", rating: 4.4 },
  6: { name: "Capital ", cuisine: "Hyderabadi Mandi", description: "Authentic arabian mandi.", rating: 4.3 },
  7: { name: "Lavish ", cuisine: "Hyderabadi Mandi", description: "Authentic arabian mandi.", rating: 4.2 },
  8: { name: "Groove9 ", cuisine: "Cafe", description: "All kind of bakes and smoothies .", rating: 4.1 },
  9: { name: "10 Downing Street ", cuisine: "Restobar And Pub", description: "Dancing rolls with all type of drinks with Fresh staters.", rating: 4.0 },
  10: { name: "Prism ", cuisine: "Hyderabad Pub", description: "Dancing rolls with all type of drinks with Fresh staters.", rating: 4.5 },
  11: { name: "Toxic ", cuisine: "Hyderabad Pub", description: "Dancing rolls with all type of drinks with Fresh staters.", rating: 4.3 },
  12: { name: "Joint-al Mandi ", cuisine: "Hyderabadi Mandi", description: "Authentic arabian mandi.", rating: 4.6 },
  13: { name: "Lucky ", cuisine: "Restaurents", description: "Authentic Hyderabadi Biryani with rich spices.", rating: 4.4 },
  14: { name: "Nimrah ", cuisine: "Irani", description: "All kind of bakes and smoothies .", rating: 4.2 },
  15: { name: "Shahtooth ", cuisine: "Milkshakes", description: "All types of smoothies,beverages and snacks.", rating: 4.7 },
};

const menuData = [
  { id: 1, name: "Hyderabadi Biryani", image: "https://i.ytimg.com/vi/uXf3xXeu1x4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBOAYLtN9EJCNL5Sik92dmqWJQdtg", price: 250, rating: 4.8 },
  { id: 2, name: "Zafrani Biryani", image: "https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/nbrni5uuxyyflb0ykq40", price: 280, rating: 4.7 },
  { id: 3, name: "Chicken fry Biryani", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiwJmy9AhftFiWRLQ2nvj1tx4rNm9uX1WrkA&s", price: 220, rating: 4.5 },
  { id: 4, name: "Mutton Biryani", image: "https://paattiskitchen.com/wp-content/uploads/2023/03/kmc_20230323_230721-500x500.jpg?crop=1", price: 300, rating: 4.9 },
  { id: 5, name: "Paya", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYfYrJneJHDVR88O0XFT35zbGdwiYWImvV5w&s", price: 180, rating: 4.3 },
  { id: 6, name: "Pattar Ka Gosht", image: "https://c.ndtvimg.com/2021-09/iukj2ebg_mutton_625x300_01_September_21.jpg", price: 250, rating: 4.6 },
  { id: 7, name: "Rumali Roti", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdZIYC6HLhhuXjgemfr8Z4_yI9pbxCE81e_w&s", price: 30, rating: 4.2 },
  { id: 8, name: "Butter Naan", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu0yBjOvU4BwUI5r6tJhYU5CQlAYOrqHphIg&s", price: 40, rating: 4.4 },
  { id: 9, name: "Tandoori Roti", image: "https://www.indianrecipeinfo.com/wp-content/uploads/2011/12/Tandoori-Roti.jpg", price: 35, rating: 4.3 },
  { id: 10, name: "Tandoori Chicken", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxACCAKbmsOg4vNPbP1hGb7b0O8KLi0Df-eQ&s", price: 280, rating: 4.7 },
  { id: 11, name: "Butter Chicken", image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/04/butter-chicken-recipe.jpg", price: 320, rating: 4.8 },
  { id: 12, name: "Fried Chicken", image: "https://www.licious.in/blog/wp-content/uploads/2019/05/Drumsticks-liquidation-plan-05.jpg", price: 200, rating: 4.5 },
];

const renderStars = (rating) => {
  return '★'.repeat(Math.round(rating));
};

const RestaurantDetails = () => {
  const { id } = useParams();
  const restaurant = restaurantData[id];
  const { addItem, cart, getTotal, removeItem } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  if (!restaurant) return <Container className="py-5">Restaurant not found</Container>;

  return (
    <Container className="py-5">
      <h2>{restaurant.name} {renderStars(restaurant.rating)} {restaurant.rating}</h2>
      <p className="text-muted">{restaurant.cuisine}</p>
      <p>{restaurant.description}</p>
      <h3 className="mt-4">Menu</h3>
      <Row>
        {menuData.map((item) => (
          <Col md={12} key={item.id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                  <div>
                    <Card.Title className="mb-1">{item.name}</Card.Title>
                    <Card.Text className="mb-0">Price: ₹{item.price} | Rating: {renderStars(item.rating)} {item.rating}</Card.Text>
                  </div>
                </div>
                <Button variant="primary" size="sm" onClick={() => { addItem(item); showToastMessage(`${item.name} added to cart!`); }}>Add</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-between align-items-center">
        <Button as={Link} to="/restaurants" variant="secondary" className="btn-sm">
          Back to List
        </Button>
      </div>

      {cart.length > 0 && (
        <Card className="mt-4 shadow-lg border-0 fixed-bottom-cart" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, borderRadius: '15px 15px 0 0' }}>
          <Card.Body className="p-3">
            <h5 className="mb-3">Cart Summary</h5>
            <ListGroup variant="flush">
              {cart.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center px-0">
                  <div className="d-flex align-items-center">
                    <img src={item.image} alt={item.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                    <span>{item.name} (x{item.quantity})</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span>₹{item.price * item.quantity}</span>
                    <Button variant="outline-danger" size="sm" className="ms-2" onClick={() => removeItem(item.id)}>
                      Remove
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <h6>Total: ₹{getTotal()}</h6>
              <Button as={Link} to="/cart" variant="success" size="sm">
                Checkout
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default RestaurantDetails;
