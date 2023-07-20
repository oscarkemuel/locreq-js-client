/* eslint-disable react/no-unescaped-entities */
"use client";
import {
  DELIVERY_STATUS,
  OPTIONS_DELIVERY_STATUS,
} from "@/constants/delivery-status";
import { FormatDateTime } from "@/functions/format-datetime";
import api from "@/services/api";
import { IDeliveryRequest, IStatus } from "@/services/api/urls/customer/types";
import { IPostSeller, IProduct } from "@/services/api/urls/seller/types";
import { useAuthStore } from "@/store/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

function SellerPage() {
  const { push: navigateTo } = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [deliveries, setDeliveries] = useState<IDeliveryRequest[]>([]);
  const [sellerId, setSellerId] = useState<string>("");

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

  function getMyProducts() {
    return api.seller.products.getAll();
  }

  const {
    refetch: refetchMyProducts,
    isFetchedAfterMount: myProductsIsFetchedAfterMount,
  } = useQuery(["getMyProducts"], getMyProducts, {
    onSuccess: ({ data }) => {
      setProducts(data.products);
    },
    refetchOnWindowFocus: true,
  });

  const deleteProductMutation = useMutation(
    (id: string) => {
      return api.seller.products.delete(id);
    },
    {
      onSuccess: () => {
        refetchMyProducts();
        toast.success("Product deleted successfully!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    }
  );

  function getDeliveries() {
    return api.seller.deliveryRequests.getAll();
  }

  const {
    refetch: refetchDeliveries,
    isFetchedAfterMount: deliveriesIsFetchedAfterMount,
  } = useQuery(["getDeliveries"], getDeliveries, {
    onSuccess: ({ data }) => {
      setDeliveries(data.deliveryRequests);
    },
    refetchOnWindowFocus: true,
  });

  const updateDeliveryStatusMutation = useMutation(
    (data: { id: string; status: IStatus }) => {
      return api.seller.deliveryRequests.updateStatus(data.id, {
        status: data.status,
      });
    },
    {
      onSuccess: () => {
        refetchDeliveries();
        toast.success("Status updated successfully!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    }
  );

  const handleClickUpdateStatus = (id: string, status: IStatus) => {
    updateDeliveryStatusMutation.mutate({ id, status });
  };

  function getMe() {
    return api.seller.getMe();
  }

  useQuery(["getMe"], getMe, {
    onSuccess: ({ data }) => {
      setSellerId(data.seller.id);
    },
    refetchOnWindowFocus: true,
    enabled: userIsSeller,
  });

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
      {sellerId && userIsSeller && (
        <Button
          variant="primary"
          onClick={() => navigateTo(`/dashboard/seller/${sellerId}`)}
          style={{ width: "100%" }}
          className="mb-5"
        >
          Go to my page
        </Button>
      )}

      <Row>
        <Col>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h3 className="m-0">My Products</h3>
            <Button
              variant="success"
              onClick={() => navigateTo("/dashboard/seller/product/add")}
            >
              New Product
            </Button>
          </div>
          <Card>
            <Card.Body className="d-flex gap-3">
              {products.map((product) => {
                return (
                  <Card key={product.id} style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text className="m-0">
                        {product.description}
                      </Card.Text>
                      <Card.Text className="m-0">
                        <b>Price:</b> R${product.price}
                      </Card.Text>
                      <Card.Text className="m-0">
                        <b>Start Time:</b>{" "}
                        {FormatDateTime(product.startTime, "en-US")}
                      </Card.Text>
                      <Card.Text className="m-0 mb-1">
                        <b>End Time:</b>{" "}
                        {FormatDateTime(product.endTime, "en-US")}
                      </Card.Text>

                      <div className="d-flex align-items-center gap-2">
                        <Button
                          variant="primary"
                          onClick={() =>
                            navigateTo(
                              `/dashboard/seller/product/${product.id}/edit`
                            )
                          }
                        >
                          <MdEdit />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() =>
                            deleteProductMutation.mutate(product.id)
                          }
                          disabled={deleteProductMutation.isLoading}
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}

              {myProductsIsFetchedAfterMount && products.length === 0 && (
                <Alert variant="warning" className="m-auto">
                  You don't have any product yet!
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="my-5">
        <Col>
          <h3 className="m-0 mb-2">My Appointments</h3>
          <Card>
            <Card.Body className="d-flex gap-3 flex-wrap">
              {deliveries.map((request) => {
                const product = request.Product;
                const address = request.place?.address;

                return (
                  <Card key={request.id} style={{ width: "20rem" }}>
                    <Card.Header>
                      <Alert
                        variant={DELIVERY_STATUS[request.status]}
                        className="m-auto"
                      >
                        {request.status.toUpperCase()}
                      </Alert>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{product?.name}</Card.Title>

                      <Card.Text className="m-0">
                        <b>Customer:</b> {request.customer?.user.name}
                      </Card.Text>
                      <Card.Text className="m-0">
                        <b>Start Time:</b>{" "}
                        {FormatDateTime(request.Product!.startTime, "en-US")}
                      </Card.Text>
                      <Card.Text className="m-0 mb-1">
                        <b>End Time:</b>{" "}
                        {FormatDateTime(request.Product!.endTime, "en-US")}
                      </Card.Text>

                      <div className="d-flex flex-column gap-2 w-100">
                        {OPTIONS_DELIVERY_STATUS.map((option) => {
                          return (
                            <Button
                              variant={option.variant}
                              className="w-100"
                              onClick={() =>
                                handleClickUpdateStatus(
                                  request.id,
                                  option.value
                                )
                              }
                              key={option.value}
                              disabled={
                                request.status === option.value ||
                                request.status === "canceled"
                              }
                            >
                              {option.label}
                            </Button>
                          );
                        })}
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}

              {deliveriesIsFetchedAfterMount && deliveries.length === 0 && (
                <Alert variant="warning" className="m-auto">
                  You don't have any deliveries yet!
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default SellerPage;
