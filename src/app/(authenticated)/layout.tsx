"use client";

import LoadingScreen from "@/components/LoadingScreen";
import api from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push: navigateTo } = useRouter();

  const {
    actions: { logOut, login },
    state: { user },
  } = useAuthStore();

  function getUserByToken() {
    return api.auth.getUserByToken();
  }

  useQuery(['getUser'], getUserByToken, {
    onSuccess: ({ data }) => {
      login(data.user.token, data.user.user);
    },
    enabled: !user,
  })

  if(!user) return <LoadingScreen />

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand onClick={() => navigateTo("/dashboard")} role="button">
            EntregaSystem
          </Navbar.Brand>
          <Nav>
            <Nav.Link onClick={() => navigateTo("/dashboard/customer")}>
              Portal do locatário
            </Nav.Link>
            <Nav.Link onClick={() => navigateTo("/dashboard/seller")}>
              Portal do locador
            </Nav.Link>
            <Nav.Link onClick={logOut}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
}
