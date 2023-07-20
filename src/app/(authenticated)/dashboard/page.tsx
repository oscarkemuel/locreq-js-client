"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

function HomePage() {
  const { push: navigateTo } = useRouter();

  const cards = [
    {
      title: "Renter Portal",
      text: "Access the Renter Portal here to make your purchases.",
      route: "/dashboard/customer",
    },
    {
      title: "Locator Portal",
      text: "Access the Locator Portal here to manage your sales.",
      route: "/dashboard/seller",
    },
  ];

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh", backgroundColor: "#f5f5f5" }}
    >
      <Row xs={1} md={2} className="g-4">
        {cards.map((card) => (
          <Col key={card.title}>
            <Card className="h-100">
              <Card.Body className="d-flex flex-column justify-content-between gap-5">
                <div>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                </div>
                <Button
                  variant="primary"
                  onClick={() => navigateTo(card.route)}
                >
                  {`Access ${card.title}`}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;
