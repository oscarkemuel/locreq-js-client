/* eslint-disable react/no-unescaped-entities */
"use client";
import api from "@/services/api";
import { IPlace, IPostCustomer } from "@/services/api/urls/customer/types";
import { useAuthStore } from "@/store/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MdArrowOutward, MdDelete, MdEdit } from "react-icons/md";
import { IDeliveryRequest } from "@/services/api/urls/customer/types";
import { DELIVERY_STATUS } from "@/constants/delivery-status";

function CustomerPage() {
  const { push: navigateTo } = useRouter();
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [requests, setRequests] = useState<IDeliveryRequest[]>([]);

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

  const {
    refetch: refetchMyPlaces,
    isFetchedAfterMount: myPlacesIsFetchedAfterMount,
  } = useQuery(["getMyPlaces"], getMyPlaces, {
    onSuccess: ({ data }) => {
      setPlaces(data.places);
    },
    refetchOnWindowFocus: true,
  });

  const deletePlaceMutation = useMutation(
    (id: string) => {
      return api.customer.places.delete(id);
    },
    {
      onSuccess: () => {
        refetchMyPlaces();
        toast.success("Place deleted successfully!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    }
  );

  function getMyRequests() {
    return api.customer.deliveryRequests.getAll();
  }

  const {
    refetch: refetchMyRequests,
    isFetchedAfterMount: myRequestsIsFetchedAfterMount,
  } = useQuery(["getMyRequests"], getMyRequests, {
    onSuccess: ({ data }) => {
      setRequests(data.deliveryRequests);
    },
    refetchOnWindowFocus: true,
  });

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
            <h3 className="m-0">My places</h3>
            <Button
              variant="success"
              onClick={() => navigateTo("/dashboard/customer/place/add")}
            >
              Create place
            </Button>
          </div>
          <Card>
            <Card.Body className="d-flex gap-3">
              {places.map((place) => {
                const { address } = place;

                return (
                  <Card key={place.id} style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{place.name}</Card.Title>
                      <Card.Text className="m-0">
                        {address.street}, {address.neighborhood} -{" "}
                        {address.number}
                      </Card.Text>
                      <Card.Text>
                        {address.city} - {address.state}
                      </Card.Text>

                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <Button
                            variant="primary"
                            onClick={() =>
                              navigateTo(
                                `/dashboard/customer/place/${place.id}/edit`
                              )
                            }
                          >
                            <MdEdit />
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => deletePlaceMutation.mutate(place.id)}
                            disabled={deletePlaceMutation.isLoading}
                          >
                            <MdDelete />
                          </Button>
                        </div>

                        <Button
                          variant="success"
                          onClick={() =>
                            navigateTo(`/dashboard/customer/place/${place.id}`)
                          }
                        >
                          <MdArrowOutward size={22} />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}

              {myPlacesIsFetchedAfterMount && places.length === 0 && (
                <Alert variant="warning" className="m-auto">
                  You don't have any place yet!
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h3 className="m-0 mb-2">My Requests</h3>
          <Card>
            <Card.Body className="d-flex gap-3">
              {requests.map((request) => {
                const product = request.Product
                return (
                  <Card key={"place.id"} style={{ width: "18rem" }}>
                    <Card.Header>
                    <Alert variant={DELIVERY_STATUS[request.status]} className="m-auto">
                      {request.status.toUpperCase()}
                    </Alert>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{product?.name}</Card.Title>

                      <Card.Text className="m-0">
                        <b>Place:</b> {request.place?.name}
                      </Card.Text>
                      <Card.Text>
                        <b>Quantity:</b> {request.quantity}
                      </Card.Text>

                      <div className="d-flex align-items-center gap-2">
                        <Button
                          variant="primary"
                          onClick={() =>
                            navigateTo(
                              `/dashboard/customer/place/${"place.id"}/edit`
                            )
                          }
                        >
                          <MdEdit />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => deletePlaceMutation.mutate("place.id")}
                          disabled={deletePlaceMutation.isLoading}
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}

              {myRequestsIsFetchedAfterMount && requests.length === 0 && (
                <Alert variant="warning" className="m-auto">
                  You don't have any request yet!
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CustomerPage;
