"use client";

import { useAppDispatch } from "@/redux/hooks";
import { selectCar } from "@/redux/slices/car/carSlice";
import { CarT } from "@/types/db";
import { useRouter } from "next/navigation";
import Card from "react-bootstrap/Card";
import { Image } from "react-bootstrap";

function ImageAndTextExample({ car }: { car: CarT }): JSX.Element {
  const dis = useAppDispatch();
  const router = useRouter();

  const handleCardClick = () => {
    dis(selectCar(car));
    router.replace("/desktopclient/main/car-more-info");
  };

  return (
    <Card
      style={{ minWidth: "25vw", cursor: "pointer" }}
      className="card-car"
      onClick={handleCardClick}
    >
      <Card.Body style={{ backgroundColor: "transparent" }}>
        <Card.Title style={{ backgroundColor: "transparent" }}>
          {car.brand} <p>{car.model}</p>
        </Card.Title>
        <Card.Text>{car.year}</Card.Text>
      </Card.Body>

      <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fluid
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
    </Card>
  );
}

export default ImageAndTextExample;
