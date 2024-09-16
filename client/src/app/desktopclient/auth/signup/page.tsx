"use client";
import PrivateRoute from "@/app/HOC/PrivateRoute";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signUpThunk } from "@/redux/slices/auth/thunks";
import { BackendUserForSignUp } from "@/types/auth";
import Link from "next/link";
import { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

export default function SignUpPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
  });

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors({
      username: form.username.length < 3,
      email: !emailRegex.test(form.email),
      password: form.password.length <= 7,
    });
    return !Object.values(errors).includes(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "username") setErrors((prev) => ({ ...prev, username: value.length < 3 }));
    if (name === "email") setErrors((prev) => ({ ...prev, email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) }));
    if (name === "password") setErrors((prev) => ({ ...prev, password: value.length <= 7 }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    await dispatch(signUpThunk(form as BackendUserForSignUp));
  };

  return (
    <PrivateRoute
      isAllowed={user.status !== "logged"}
      redirect="/desktopclient/main"
    >
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Row className="w-100">
          <Col xs={12} md={6} lg={4} className="mx-auto">
            <Card className="shadow p-4">
              <Card.Body>
                <h2 className="text-center mb-4">Регистрация нового пользователя</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="username" className="mb-3">
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Введите ваше имя"
                      value={form.username}
                      onChange={handleChange}
                      isInvalid={errors.username}
                      required
                    />
                    {errors.username && (
                      <Form.Control.Feedback type="invalid">
                        Имя пользователя должно содержать не менее 3 символов.
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Введите ваш email"
                      value={form.email}
                      onChange={handleChange}
                      isInvalid={errors.email}
                      required
                    />
                    {errors.email && (
                      <Form.Control.Feedback type="invalid">
                        Введите корректный email.
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Введите ваш пароль"
                      value={form.password}
                      onChange={handleChange}
                      isInvalid={errors.password}
                      required
                    />
                    {errors.password && (
                      <Form.Control.Feedback type="invalid">
                        Пароль должен содержать более 7 символов.
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100"
                    style={{
                      backgroundColor: "#7da0a0",
                      borderColor: "#7da0a0",
                    }}
                    disabled={Object.values(errors).includes(true)}
                  >
                    Зарегистрироваться
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  Уже есть аккаунт?{" "}
                  <Link href="/desktopclient/auth/login">
                    <Button variant="link" style={{ color: "#7da0a0" }}>
                      Войти
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PrivateRoute>
  );
}
