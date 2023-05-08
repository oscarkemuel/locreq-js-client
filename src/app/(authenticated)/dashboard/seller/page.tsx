"use client";
import api from "@/services/api";
import { IPostSeller } from "@/services/api/urls/seller/types";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

function SellerPage() {
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
      address: {
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
  });

  const mutation = useMutation(
    (data: IPostSeller) => {
      return api.seller.post(data);
    },
    {
      onSuccess: () => {
        updateUserInfo();
        toast.success("Registered successfully!");
      },
      onError: (error: any) => {
        const {
          response: {
            data: { message },
          },
        } = error;
        toast.error(message);
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const userIsSeller = user?.rules?.includes("seller");

  if (!userIsSeller) {
    return (
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                <Alert variant="danger">
                  You are not yet a seller! Register now:
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

                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicAddressStreet"
                    >
                      <Form.Label>Street</Form.Label>
                      <Controller
                        control={control}
                        name="address.street"
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <Form.Control
                            type="text"
                            placeholder="Rua dos bobos"
                            value={value}
                            onChange={onChange}
                            isInvalid={!!errors.address?.street}
                          />
                        )}
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicAddressNumber"
                    >
                      <Form.Label>Number</Form.Label>
                      <Controller
                        control={control}
                        name="address.number"
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <Form.Control
                            type="text"
                            placeholder="123"
                            value={value}
                            onChange={onChange}
                            isInvalid={!!errors.address?.number}
                          />
                        )}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicAddressZipCode"
                    >
                      <Form.Label>Zip Code</Form.Label>
                      <Controller
                        control={control}
                        name="address.zipCode"
                        rules={{ required: true, minLength: 9, maxLength: 9 }}
                        render={({ field: { value, onChange } }) => (
                          <Form.Control
                            type="text"
                            placeholder="CEP"
                            value={value}
                            onChange={onChange}
                            isInvalid={!!errors.address?.zipCode}
                            maxLength={9}
                            minLength={9}
                          />
                        )}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicAddressNeighborhood"
                    >
                      <Form.Label>Neighborhood</Form.Label>
                      <Controller
                        control={control}
                        name="address.neighborhood"
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <Form.Control
                            type="text"
                            placeholder="Bairro"
                            value={value}
                            onChange={onChange}
                            isInvalid={!!errors.address?.neighborhood}
                          />
                        )}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicAddressCity"
                    >
                      <Form.Label>City</Form.Label>
                      <Controller
                        control={control}
                        name="address.city"
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <Form.Control
                            type="text"
                            placeholder="Boderópolis"
                            value={value}
                            onChange={onChange}
                            isInvalid={!!errors.address?.city}
                          />
                        )}
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicAddressState"
                    >
                      <Form.Label>State</Form.Label>
                      <Controller
                        control={control}
                        name="address.state"
                        rules={{ required: true, maxLength: 2, minLength: 2 }}
                        render={({ field: { value, onChange } }) => (
                          <Form.Control
                            type="text"
                            placeholder="Estado"
                            value={value}
                            onChange={onChange}
                            isInvalid={!!errors.address?.state}
                            maxLength={2}
                            minLength={2}
                          />
                        )}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicAddressComplement"
                    >
                      <Form.Label>Complement</Form.Label>
                      <Controller
                        control={control}
                        name="address.complement"
                        render={({ field: { value, onChange } }) => (
                          <Form.Control
                            type="text"
                            value={value}
                            onChange={onChange}
                            isInvalid={!!errors.address?.complement}
                          />
                        )}
                      />
                    </Form.Group>
                  </Col>
                </Row>

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
          <Card style={{ minHeight: "60vh" }}>
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default SellerPage;
