import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-background">
      <Container className="text-center py-5">
        <h1 className="display-4 fw-bold">Discover the best food & drinks</h1>
        <p className="lead mb-4">Explore top-rated restaurants near you</p>
        <Button as={Link} to="/restaurants" variant="danger" size="lg">
          Explore Restaurants
        </Button>
      </Container>
    </div>
  );
};

export default Home;
