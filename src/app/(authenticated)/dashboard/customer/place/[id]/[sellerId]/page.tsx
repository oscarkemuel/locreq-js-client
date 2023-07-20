/* eslint-disable react/no-unescaped-entities */
"use client";
import { formatPrice } from "@/functions/format-price";
import api from "@/services/api";
import { IPostDeliveryRequest } from "@/services/api/urls/customer/types";
import { IProduct } from "@/services/api/urls/seller/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { toast } from "react-toastify";

interface IProps {
  params: {
    id: string;
    sellerId: string;
  };
}

function DeliveryResquestPage({ params: { id, sellerId } }: IProps) {
  const { push: navigateTo } = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      days: 0,
    },
  });

  const handleClose = () => {
    setShow(false);
    setSelectedProduct(null);
    clearErrors();
    reset();
  };
  const handleShow = () => setShow(true);

  function getProduts() {
    return api.seller.products.getBySeller(sellerId);
  }

  const {
    refetch: refetchProducts,
    isFetchedAfterMount: myProductsIsFetchedAfterMount,
  } = useQuery(["getMyProducts"], getProduts, {
    onSuccess: ({ data }) => {
      setProducts(data.products);
    },
    refetchOnWindowFocus: true,
  });

  const mutation = useMutation(
    (data: IPostDeliveryRequest) => {
      return api.customer.deliveryRequests.post(data);
    },
    {
      onSuccess: () => {
        handleClose();
        navigateTo(`/dashboard/customer/place/${id}`);
        toast.success("Registered successfully!");
      },
      onError: (error: any) => {
        handleClose();
        toast.error(error.response.data.message);
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    const payload = {
      days: Number(data.days),
      placeId: id,
      productId: selectedProduct!.id,
    };

    mutation.mutate(payload);
  });

  const formModal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          New Delivery Request - {selectedProduct?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicQuantity">
            <Form.Label>Days</Form.Label>
            <Controller
              control={control}
              name="days"
              render={({ field: { value, onChange } }) => (
                <Form.Control
                  type="number"
                  placeholder="2"
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.days}
                />
              )}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={!isEmpty(errors) || mutation.isLoading}
            >
              Send
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );

  return (
    <>
      {formModal}
      <Row>
        <Col>
          <h3 className="m-0 mb-2">Products</h3>
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
                        <b>Price:</b> {formatPrice(product.price, "en-US")}
                      </Card.Text>

                      <Alert
                        variant={product.available ? "success" : "danger"}
                        className="mt-2"
                      >
                        {product.available ? "Available" : "Unavailable"}
                      </Alert>
                      <div className="d-flex align-items-center gap-2">
                        <Button
                          variant="success"
                          disabled={!product.available}
                          onClick={() => {
                            setSelectedProduct(product);
                            handleShow();
                          }}
                        >
                          <MdAdd size={25} />
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
    </>
  );
}

export default DeliveryResquestPage;
