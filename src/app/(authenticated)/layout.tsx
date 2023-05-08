"use client";

import { checkUserAuthenticated } from "@/functions/check-user-authenticated";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push: navigateTo } = useRouter();
  const userIsAuthenticated = checkUserAuthenticated();
  const {
    actions: { logOut },
  } = useAuthStore();

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand onClick={() => navigateTo("/")}>
            EntregaSystem
          </Navbar.Brand>
          <Nav>
            <Nav.Link onClick={() => navigateTo("/dashboard/customer")}>
              Portal do cliente
            </Nav.Link>
            <Nav.Link onClick={() => navigateTo("/dashboard/seller")}>
              Portal do vendedor
            </Nav.Link>

            {userIsAuthenticated && (
              <Nav.Link onClick={logOut}>Logout</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      {children}
    </>
  );
}
