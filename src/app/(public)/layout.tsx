"use client";

import { checkUserAuthenticated } from "@/functions/check-user-authenticated";
import { useRouter } from "next/navigation";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push: navigateTo } = useRouter();
  const userIsAuthenticated = checkUserAuthenticated();

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand onClick={() => navigateTo("/")}>
            EntregaSystem
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigateTo("/login")}>Login</Nav.Link>
            <Nav.Link onClick={() => navigateTo("/register")}>
              Register
            </Nav.Link>
            {userIsAuthenticated && (
              <Nav.Link onClick={() => navigateTo("/dashboard")}>
                Dashboard
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      {children}
    </>
  );
}
