"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAuthThunk } from "@/redux/slices/auth/thunks";
import { setShowModal } from "@/redux/slices/car/carSlice";
import Link from "next/link";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function TextLinkExample() {
  const { user } = useAppSelector((s) => s.auth);
  const dis = useAppDispatch();
  return (
    <Navbar className="navBar">
      <Container>
        <Link href="/desktopclient/main" style={{ textDecoration: "none" }}>
          <Navbar.Brand style={{ color: "white", fontWeight: "bold" }}>
            Главная
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Button
          type="button"
          variant=""
          style={{ color: "#e0fcdced", fontWeight: "bold", border: 'solid 0.1vw white', marginRight: '3%' }}
          onClick={() => {
            void dis(setShowModal());
          }}
        >
          +
        </Button>
          {user.status === "logged" ? (
            <Navbar.Text style={{ color: "white" }}>
              Привет: {user.username} |{" "}
              <Link
                href="#"
                onClick={() => void dis(logoutAuthThunk())}
                style={{ color: "white" }}
              >
                Выйти
              </Link>
            </Navbar.Text>
          ) : (
            <Navbar.Text style={{ color: "white" }}>
              Hello: guest <Link href="/desktopclient/auth/login">Sign up</Link>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;
