"use client";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function CarDetailScreen(): JSX.Element {
  const { selectedCar } = useAppSelector((s) => s.car);
  const router = useRouter();

  useEffect(() => {
    if (!selectedCar) {
      router.replace("/desktopclient/main/");
    }
  }, [selectedCar]);

  return selectedCar ? (
    <div
      style={{
        width: "100%",
        height: "100vh",
        padding: "3%",
        backgroundColor: "#050505dc",
      }}
    >
      <Row style={{ height: "100%" }}>
        <Col
          md={8}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "2rem",
            borderRadius: "8px",
          }}
        >
          <Card bg="light" border="secondary" style={{ flex: 0 }}>
            <Card.Body>
              <Card.Title style={{ marginTop: "2%", marginBottom: "5%" }}>
                День рожения: {selectedCar.year}
              </Card.Title>
              <Card.Text style={{ marginTop: "5%", marginBottom: "5%" }}>
                <strong>Марка:</strong> {selectedCar.brand}
              </Card.Text>
              <Card.Text style={{ marginTop: "5%", marginBottom: "5%" }}>
                <strong>Модель:</strong> {selectedCar.model}
              </Card.Text>
              <Card.Text style={{ marginTop: "5%", marginBottom: "5%" }}>
                <strong>Цвет:</strong> {selectedCar.color}
              </Card.Text>
              <Card.Text style={{ marginTop: "5%", marginBottom: "5%" }}>
                <strong>Двигатель:</strong> {selectedCar.engine.type}
              </Card.Text>
             {selectedCar.transmission && <Card.Text style={{ marginTop: "5%", marginBottom: "5%" }}>
                <strong>Трансмиссия:</strong> {selectedCar.transmission.type}
              </Card.Text>}
              <Card.Text style={{ marginTop: "5%", marginBottom: "5%" }}>
                <strong>Цена:</strong> {selectedCar.price}
              </Card.Text>
            </Card.Body>
          </Card>
          <Button
            variant="primary"
            style={{ margin: "5%" }}
          >
            Что-то
          </Button>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img
              variant="top"
              src={selectedCar.image}
              alt={selectedCar.color}
              style={{ height: "300px", objectFit: "cover" }}
            />
          </Card>
          <Card style={{ marginTop: "1rem" }}>
            <Card.Img
              variant="top"
              src={selectedCar.image}
              alt={selectedCar.color}
              style={{
                height: "300px",
                objectFit: "cover",
                transform: "scaleX(-1)",
              }}
            />
          </Card>
          <Link href="/desktopclient/main" style={{textDecoration: 'none',  width: '100%', marginTop: '3%'}}>
          <Button style={{ color: "white", fontWeight: "bold", width: '100%', marginTop: '7%' }} type='button' variant="secondary">
            Назад
          </Button>
        </Link>
        </Col>
      </Row>
    </div>
  ) : (
    <div>Вы не выбрали машину</div>
  );
}
