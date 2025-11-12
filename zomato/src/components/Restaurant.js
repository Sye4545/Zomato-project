import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const restaurantData = [
  { id: 1, name: "Bawarchi", cuisine: "Indian", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMBa-gnOHaYrM7Q8S4CN3TkONmJXJfsPpDsQ&s", rating: 4.8 },
  { id: 2, name: "Shah Ghouse", cuisine: "zafrani", image: "https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2024/5/17/d27b4c14-2428-467e-bc25-fd9fe58c4b8d_20240517T203148946.jpg", rating: 4.7 },
  { id: 3, name: "Shadab", cuisine: "Hyderabad", image: "Https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/97/de/a4/hotel-entrance.jpg?w=1000&h=1000&s=1", rating: 4.5 },
  { id: 4, name: "Mehfil", cuisine: "Hyderabad", image: "https://static.wixstatic.com/media/359647_ee35643ea97d424caab189112f8c4e7a~mv2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Mehfil_Uppal.jpg", rating: 4.6 },
  { id: 5, name: "Pista house", cuisine: "Hyderabad", image: "https://b.zmtcdn.com/data/pictures/1/20013771/3c423bb4e44b4c070defaabf19a08eea.jpg", rating: 4.4 },
  { id: 6, name: "Capital", cuisine: "Hyderabadi mandi", image: "https://content3.jdmagicbox.com/v2/comp/hyderabad/l5/040pxx40.xx40.221015204905.j2l5/catalogue/capital-multi-cuisine-restaurant-hyderguda-hyderabad-restaurants-tmxryorml7.jpg", rating: 4.3 },
  { id: 7, name: "Lavish", cuisine: "Hyderabadi mandi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzj3pZGZSh6hDcQEiH8x5BlVvPGXB8qDqOZA&s", rating: 4.2 },
  { id: 8, name: "Groove9", cuisine: "Cafe", image: "https://content.jdmagicbox.com/v2/comp/hyderabad/u9/040pxx40.xx40.180111120515.d1u9/catalogue/groove-9-sainikpuri-hyderabad-coffee-shops-jvbdz.jpg", rating: 4.1 },
  { id: 9, name: "10 downing street", cuisine: "Restobar and Pub", image: "https://b.zmtcdn.com/data/pictures/0/20229580/b392235ca155237e2801485c49e8a27f.jpg?fit=around|960:500&crop=960:500;*,*", rating: 4.0 },
  { id: 10, name: "prism", cuisine: "Hyderabad Pub", image: "https://www.prismclubs.com/assets/gallery/025.webp", rating: 4.5 },
  { id: 11, name: "toxic", cuisine: "Hyderabad Pub", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVqH2zD7xhob16maLbJ9iROMPj2nQ_xjDqhA&s", rating: 4.3 },
  { id: 12, name: "joint-al Mandi", cuisine: "Hyderabadi Mandi", image: "https://b.zmtcdn.com/data/pictures/3/19500123/9e508ccd084606f3aed274a8f0dd3e5e.jpeg", rating: 4.6 },
  { id: 13, name: "lucky", cuisine: "Restaurents", image: "https://b.zmtcdn.com/data/pictures/8/19897358/fc1d474d515feae9a398e1532c184ab9.jpeg?fit=around|960:500&crop=960:500;*,*", rating: 4.4 },
  { id: 14, name: "nimrah", cuisine: "Irani", image: "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2018/05/14115150/Nimra2.png", rating: 4.2 },
  { id: 15, name: "shahtooth", cuisine: "MilkShakes", image: "https://i.ytimg.com/vi/kUDGU95cmP8/oardefault.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLDJ350ZbLItwnzlsbpfl_KT3geXGA", rating: 4.7 },

];
const renderStars = (rating) => {
  return '★'.repeat(Math.round(rating));
};

const Restaurants = () => {
  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Restaurants Near You</h2>
      <Row>
        {restaurantData.map((r) => (
          <Col md={4} key={r.id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img variant="top" src={r.image} />
              <Card.Body>
                <Card.Title>{r.name}</Card.Title>
                <Card.Text>{r.cuisine} | Rating: {renderStars(r.rating)} {r.rating}</Card.Text>
                <Button as={Link} to={`/restaurants/${r.id}`} variant="danger">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Restaurants;