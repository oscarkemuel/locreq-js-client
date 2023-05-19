"use client";

import api from "@/services/api";
import { IPostLogin } from "@/services/api/urls/auth/types";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

export default function LoginScreen() {
  const { push: navigateTo } = useRouter()

  const {
    actions: { login },
  } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation(
    (data: IPostLogin) => {
      return api.auth.login(data);
    },
    {
      onSuccess: ({ data }) => {
        login(data.user.token, data.user.user);
        toast.success("Welcome! You are now logged in.");
        navigateTo("/dashboard");
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <Container className="d-flex justify-content-center">
      <Card body>
        <Card.Title>Entrega System - LOGIN</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Login to your account
        </Card.Subtitle>

        <hr />

        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.email}
                />
              )}
            />
            <Form.Text className="text-muted">
              Well never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Form.Control
                  type="password"
                  placeholder="********"
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.password}
                />
              )}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={!isEmpty(errors) || mutation.isLoading}
          >
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
