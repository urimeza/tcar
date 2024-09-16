"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearFilters, setFilters } from "@/redux/slices/car/carSlice";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getCarsThunk,
  getEnginesThunk,
  getTransmissinThunk,
} from "@/redux/slices/car/thunks";

const baseFilters = {
  color: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  brand: undefined,
  model: undefined,
  minAge: undefined,
  maxAge: undefined,
  engineId: undefined,
  transmissionId: undefined,
  range: undefined,
};

const CarFilter: React.FC = () => {
  const dispatch = useDispatch();
  const dis = useAppDispatch();
  const { engines, transmissons, filters } = useAppSelector((s) => s.car);

  const [localFilters, setLocalFilters] = useState(filters);
  const [showFilters, setShowFilters] = useState(true);
  let timeoutId: ReturnType<typeof setTimeout>;

  useEffect(() => {
    void dis(getEnginesThunk());
    void dis(getTransmissinThunk());
  }, [dis]);

  useEffect(() => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      dispatch(setFilters(localFilters));
      void dis(getCarsThunk(localFilters));
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [localFilters, dispatch, dis]);

  const handleReset = () => {
    setLocalFilters(baseFilters);
    dispatch(clearFilters());
    void dis(getCarsThunk(baseFilters));
  };

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value || undefined,
    }));
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: Number(value) || undefined,
    }));
  };

  return (
    <Form
      style={{
        padding: "4%",
        paddingTop: "2%",
        backgroundColor: "#a63e1e",
        color: "white",
        backgroundImage:
          'url("https://img.freepik.com/free-photo/shiny-blank-clean-stage-room-background_1409-5010.jpg")',
        backgroundSize: "100%",
      }}
    >
      <Button
        variant="secondary"
        style={{ marginBottom: "3%" }}
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Скрыть все фильтры" : "Показать все фильтры"}
      </Button>
      <Button
        variant="danger"
        className="clearAll"
        onClick={handleReset}
        style={{ marginBottom: "3%", marginLeft: '3%' }}
      >
        Сбросить все фильтры
      </Button>

      {showFilters && (
        <>
          <div
            style={{
              border: "0.2vw solid #9adaf5",
              borderRadius: "1vw",
              marginBottom: "20px",
              backgroundColor: "#050505dc",
              padding: "2%",
            }}
          >
            <h5>Поиск по параметрам</h5>
            <Row className="mb-3">
              <Col xs={6} md={4}>
                <Form.Group controlId="formEngine">
                  <Form.Label>Двигатель</Form.Label>
                  <Form.Control
                    as="select"
                    name="engineId"
                    value={localFilters.engineId || ""}
                    onChange={handleChange}
                  >
                    <option value="">Выберите двигатель</option>
                    {engines.map((engine) => (
                      <option value={engine.id} key={engine.id}>
                        {engine.type}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col xs={6} md={4}>
                <Form.Group controlId="formTransmission">
                  <Form.Label>Трансмиссия</Form.Label>
                  <Form.Control
                    as="select"
                    name="transmissionId"
                    value={localFilters.transmissionId || ""}
                    onChange={handleChange}
                    disabled={!filters.engineId || filters.engineId == 3}
                  >
                    <option value="">
                      {!filters.engineId || filters.engineId == 3
                        ? "Двигатель не выбран или он электрический"
                        : "Выберите трансмиссию"}
                    </option>
                    {transmissons.map((transmisson) => (
                      <option value={transmisson.id} key={transmisson.id}>
                        {transmisson.type}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div
            style={{
              border: "0.2vw solid #9adaf5",
              borderRadius: "1vw",
              marginBottom: "20px",
              backgroundColor: "#050505dc",
              padding: "2%",
            }}
          >
            <h5>Ценовые и возрастные параметры</h5>
            <Row className="mb-3">
              <Col xs={6} md={4}>
                <Form.Group controlId="formMinPrice">
                  <Form.Label>Минимальная цена</Form.Label>
                  <Form.Control
                    type="number"
                    name="minPrice"
                    value={localFilters.minPrice || ""}
                    onChange={handleRangeChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={6} md={4}>
                <Form.Group controlId="formMaxPrice">
                  <Form.Label>Максимальная цена</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxPrice"
                    value={localFilters.maxPrice || ""}
                    onChange={handleRangeChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={6} md={4}>
                <Form.Group controlId="formRange">
                  <Form.Label>Минимальный запас хода</Form.Label>
                  <Form.Control
                    type="number"
                    name="range"
                    value={localFilters.range || ""}
                    onChange={handleRangeChange}
                    disabled={!(filters.engineId == 3)}
                    placeholder={
                      !(filters.engineId == 3)
                        ? "Электрический двигатель не выбран"
                        : ""
                    }
                  />
                </Form.Group>
              </Col>

              <Col xs={6} md={4}>
                <Form.Group controlId="formMinAge">
                  <Form.Label>Минимальный возраст</Form.Label>
                  <Form.Control
                    type="number"
                    name="minAge"
                    value={localFilters.minAge || ""}
                    onChange={handleRangeChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={6} md={4}>
                <Form.Group controlId="formMaxAge">
                  <Form.Label>Максимальный возраст</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxAge"
                    value={localFilters.maxAge || ""}
                    onChange={handleRangeChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div
            style={{
              border: "0.2vw solid #9adaf5",
              borderRadius: "1vw",
              backgroundColor: "#050505dc",
              padding: "2%",
            }}
          >
            <h5>Текстовые параметры</h5>
            <Row className="mb-3">
              <Col xs={6} md={4}>
                <Form.Group controlId="formColor">
                  <Form.Label>Цвет {"(ru)"}</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={localFilters.color || ""}
                    onChange={handleChange}
                    placeholder="Белый"
                  />
                </Form.Group>
              </Col>

              <Col xs={6} md={4}>
                <Form.Group controlId="formBrand">
                  <Form.Label>Бренд {"(en)"}</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={localFilters.brand || ""}
                    onChange={handleChange}
                    placeholder="Mercedes"
                  />
                </Form.Group>
              </Col>

              <Col xs={6} md={4}>
                <Form.Group controlId="formModel">
                  <Form.Label>Модель {"(en)"}</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    value={localFilters.model || ""}
                    onChange={handleChange}
                    placeholder="Glc"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </>
      )}
    </Form>
  );
};

export default CarFilter;
