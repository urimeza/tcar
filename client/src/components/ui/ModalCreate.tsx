"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setShowModal } from "@/redux/slices/car/carSlice";
import { postCarsThunk } from "@/redux/slices/car/thunks";
import { CarT } from "@/types/db";
import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const baseCar: Omit<CarT, "id" | "engine" | "transmission"> = {
  image: "",
  brand: "",
  model: "",
  color: "",
  price: 0,
  year: new Date().getFullYear(),
  range: 0,
  transmissionId: 0,
  engineId: 0,
};

function ModalCreate() {
  const { modalShow, engines, transmissons } = useAppSelector((s) => s.car);
  const dispatch = useAppDispatch();

  const [carData, setCarData] =
    useState<Omit<CarT, "id" | "engine" | "transmission">>(baseCar);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClose = () => {
    dispatch(setShowModal());
    setErrorMessage(null);
    setCarData(baseCar);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setCarData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "year" ||
        name === "range" ||
        name === "engineId" ||
        name === "transmissionId"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedEngine = engines.find(
      (engine) => engine.id === carData.engineId
    );

    if (selectedEngine && selectedEngine.type !== "Электрический") {
      setCarData((prev) => ({
        ...prev,
        range: 0,
      }));

      if (carData.transmissionId === 0) {
        setErrorMessage("Для ДВС выберите трансмиссию.");
        return;
      }
    } else if (selectedEngine && selectedEngine.type === "Электрический") {
      setCarData((prev) => ({
        ...prev,
        transmissionId: 0,
      }));

      if (carData.range <= 0) {
        setErrorMessage("Запас хода должен быть больше 0 для электромобиля.");
        return;
      }
    }

    if (
      !carData.brand ||
      !carData.model ||
      !carData.color ||
      carData.price <= 0 ||
      carData.year <= 0 ||
      carData.engineId === 0
    ) {
      setErrorMessage("Заполните все поля корректно.");
      return;
    }
    console.log(234);

    dispatch(postCarsThunk(carData));
    handleClose();
  };
  return (
    <>
      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить автомобиль</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ border: !!errorMessage ? "solid 0.1vw red" : "" }}>
          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBrand">
              <Form.Label>Бренд</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите бренд"
                name="brand"
                value={carData.brand}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formModel">
              <Form.Label>Модель</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите модель"
                name="model"
                value={carData.model}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formColor">
              <Form.Label>Цвет</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите цвет"
                name="color"
                value={carData.color}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Цена</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введите цену"
                name="price"
                value={carData.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formYear">
              <Form.Label>Год выпуска</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введите год"
                name="year"
                value={carData.year}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEngine">
              <Form.Label>Двигатель</Form.Label>
              <Form.Control
                as="select"
                name="engineId"
                value={carData.engineId}
                onChange={handleChange}
              >
                <option value={0}>Выберите двигатель</option>
                {engines.map((engine) => (
                  <option key={engine.id} value={engine.id}>
                    {engine.type}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRange">
              <Form.Label>Запас хода</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введите запас хода"
                name="range"
                value={carData.range}
                onChange={handleChange}
                disabled={carData.engineId !== 3}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTransmission">
              <Form.Label>Трансмиссия</Form.Label>
              <Form.Control
                as="select"
                name="transmissionId"
                value={carData.transmissionId}
                onChange={handleChange}
                disabled={carData.engineId === 0 || carData.engineId === 3}
              >
                <option value={0}>Выберите трансмиссию</option>
                {transmissons.map((transmisson) => (
                  <option key={transmisson.id} value={transmisson.id}>
                    {transmisson.type}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Ссылка на изображение</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите ссылку на изображение"
                name="image"
                value={carData.image}
                onChange={handleChange}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Закрыть
              </Button>
              <Button variant="primary" type="submit">
                Сохранить изменения
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalCreate;
