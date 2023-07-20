"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push: navigateTo } = useRouter();
  
  const {
    actions: { logOut, getToken },
  } = useAuthStore();

  const userIsAuthenticated = !!getToken();

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand onClick={() => navigateTo("/")} role="button">
            AgendaSystem
          </Navbar.Brand>
          <Nav>
              <Nav.Link onClick={() => navigateTo("/login")}>Login</Nav.Link>
              <Nav.Link onClick={() => navigateTo("/register")}>
                Register
              </Nav.Link>
              {/* {userIsAuthenticated ? (
                <Nav.Link onClick={() => navigateTo("/dashboard")}>
                Dashboard
              </Nav.Link>
              ) : null} */}
              {/* {userIsAuthenticated && (
                <Nav.Link onClick={logOut}>Logout</Nav.Link>
              )} */}
          </Nav>
        </Container>
      </Navbar>
      {children}
    </>
  );
}
