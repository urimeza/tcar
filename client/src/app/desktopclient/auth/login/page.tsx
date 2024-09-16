'use client'
import PrivateRoute from '@/app/HOC/PrivateRoute';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginThunk } from '@/redux/slices/auth/thunks';
import { BackendUserForSignUp } from '@/types/auth';
import Link from 'next/link';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

export default function LoginPage(): JSX.Element {
  const dis = useAppDispatch();
  const { user } = useAppSelector(s => s.auth);

  return (
    <PrivateRoute
    isAllowed={user.status !== 'logged'}
    redirect='/desktopclient/main'
  >
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', backgroundColor: 'transperent' }}>
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="shadow p-4" style={{backgroundColor: 'transperent' }}>
            <Card.Body>
              <h2 className="text-center mb-4">Вход в личный кабинет</h2>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = Object.fromEntries(new FormData(e.currentTarget)) as Omit<
                    BackendUserForSignUp,
                    'username'
                  >;

                  void dis(loginThunk(formData));
                }}
              >
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Введите ваш email"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password" className="mt-3">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Введите ваш пароль"
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 mt-4"
                  style={{ backgroundColor: '#7da0a0', borderColor: '#7da0a0' }}
                >
                  Войти
                </Button>
              </Form>
              <div className="text-center mt-3">
                Нет аккаунта?{' '}
                <Link href='/desktopclient/auth/signup'>
                <Button variant="link" style={{ color: '#7da0a0' }}>
                  Зарегистрироваться
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
