"use client";

import api from "@/services/api";
import { IPostUser } from "@/services/api/urls/user/types";
import { useMutation } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

export default function RegisterScreen() {
  const { push: navigateTo } = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostUser>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const mutation = useMutation(
    (data: IPostUser) => {
      return api.user.post(data);
    },
    {
      onSuccess: () => {
        toast.success('User created successfully!');
        navigateTo("/login");
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
        <Card.Title>Entrega System - REGISTER</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Register to access the system
        </Card.Subtitle>

        <hr />

        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.name}
                />
              )}
            />
            <Form.Text className="text-muted">
              Well never share your email with anyone else.
            </Form.Text>
          </Form.Group>

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
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
