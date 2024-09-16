"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCarsThunk } from "@/redux/slices/car/thunks";
import { lazy, Suspense, useEffect, memo } from "react";
import FiltrationPage from "./FiltrationPage";
import { Row, Col, Container } from "react-bootstrap";
import Loader from "../ui/Loader";
const CardCar = lazy(() => import("@/components/ui/CardCar"));

export function MainCarPage(): JSX.Element {
  const { cars, filters } = useAppSelector((s) => s.car);
  const dis = useAppDispatch();
  useEffect(() => {
    void dis(getCarsThunk(filters));
  }, []);

  return (
    <>
      <FiltrationPage />
      <div className="card-back">
        <Row xs={2} md={2}>
          {cars.length > 0 ? (
            cars.map((car) => (
              <Col key={car.id} className="mb-4">
                <Suspense fallback={<Loader />}>
                  <CardCar car={car} />
                </Suspense>
              </Col>
            ))
          ) : (
            <Container style={{ textAlign: "center", whiteSpace: "nowarp" }}>
              <h1 style={{ color: "white", whiteSpace: "nowarp" }}>
                Ничгео не нашлось
              </h1>
            </Container>
          )}
        </Row>
      </div>
    </>
  );
}

export default memo(MainCarPage);
