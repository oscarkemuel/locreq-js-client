"use client";
import api from "@/services/api";
import { IPostCustomer } from "@/services/api/urls/customer/types";
import { useAuthStore } from "@/store/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

function CustomerPage() {
  const { push: navigateTo } = useRouter();

  const {
    state: { user },
    actions: { updateUserInfo },
  } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
    },
  });

  const mutation = useMutation(
    (data: IPostCustomer) => {
      return api.customer.post(data);
    },
    {
      onSuccess: () => {
        updateUserInfo();
        toast.success("Registered successfully!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const userIsCustomer = user?.rules?.includes("customer");

  function getMyPlaces() {
    return api.customer.places.getAll();
  }

  useQuery(['getMyPlaces'], getMyPlaces, {
    onSuccess: ({ data }) => {
      console.log(data)
    },
    refetchOnWindowFocus: true
  })

  if (!userIsCustomer) {
    return (
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                <Alert variant="danger">
                  You are not yet a customer! Register now:
                </Alert>
              </Card.Title>

              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Your phone</Form.Label>
                  <Controller
                    control={control}
                    name="phone"
                    rules={{ required: true, minLength: 11, maxLength: 11 }}
                    render={({ field: { value, onChange } }) => (
                      <Form.Control
                        type="phone"
                        placeholder="84999999999"
                        value={value}
                        onChange={onChange}
                        isInvalid={!!errors.phone}
                        maxLength={11}
                      />
                    )}
                  />
                  <Form.Text className="text-muted">
                    Use a never registered phone.
                  </Form.Text>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={!isEmpty(errors) || mutation.isLoading}
                >
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row>
        <Col>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h3 className="m-0">Your palces</h3>
            <Button variant="success" onClick={() => navigateTo('/dashboard/customer/place/add')}>Create place</Button>
          </div>
          <Card>
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CustomerPage;
