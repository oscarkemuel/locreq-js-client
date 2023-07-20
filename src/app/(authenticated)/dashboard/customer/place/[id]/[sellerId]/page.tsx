/* eslint-disable react/no-unescaped-entities */
"use client";
import { FormatDateTime } from "@/functions/format-datetime";
import { formatPrice } from "@/functions/format-price";
import api from "@/services/api";
import { IPostDeliveryRequest } from "@/services/api/urls/customer/types";
import { IProduct } from "@/services/api/urls/seller/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Button, Card, Col, Modal, Row } from "react-bootstrap";
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

  const handleClose = () => {
    setShow(false);
    setSelectedProduct(null);
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

  const onSubmit = () => {
    const payload = {
      placeId: id,
      productId: selectedProduct!.id,
    };

    mutation.mutate(payload);
  };

  const formModal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          New Delivery Request - {selectedProduct?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Confirm your order?</h3>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={mutation.isLoading}
            onClick={onSubmit}
          >
            Yes
          </Button>
        </Modal.Footer>
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
                      <Card.Text>
                        <b>Start Time:</b>{" "}
                        {FormatDateTime(product.startTime, "en-US")}
                      </Card.Text>
                      <Card.Text>
                        <b>End Time:</b>{" "}
                        {FormatDateTime(product.endTime, "en-US")}
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
