/* eslint-disable react/no-unescaped-entities */
"use client";
import { DELIVERY_STATUS } from "@/constants/delivery-status";
import api from "@/services/api";
import { IDeliveryRequest, IGetSearchSellersResponse, Seller, SellerWithAddress } from "@/services/api/urls/customer/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { MdAttachMoney, MdClose, MdDelete, MdEdit, MdPerson, MdSearch } from "react-icons/md";
import { toast } from "react-toastify";

interface IProps {
  params: {
    id: string;
  };
}

function CustomerPlacePage({ params: { id } }: IProps) {
  const { push: navigateTo } = useRouter();
  const [requests, setRequests] = useState<IDeliveryRequest[]>([]);
  const [sellers, setSellers] = useState<SellerWithAddress[]>([]);

  function searchSellers() {
    return api.customer.places.searchSellers(id);
  }

  const {
    refetch: refetchSellers,
    isFetchedAfterMount: sellersIsFetchedAfterMount,
  } = useQuery(["searchSellers"], searchSellers, {
    onSuccess: ({ data }) => {
      setSellers(data.sellers);
    },
    refetchOnWindowFocus: true,
  });


  function getMyRequests() {
    return api.customer.deliveryRequests.getByPlace(id);
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

  const cancelRequestMutation = useMutation(
    (id: string) => {
      return api.customer.deliveryRequests.cancel(id);
    },
    {
      onSuccess: () => {
        refetchMyRequests();
        toast.success("Request canceled successfully!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    }
  );

  return (
    <>
      <Row className="mt-5">
        <Col>
          <h3 className="m-0 mb-2">Sellers around</h3>
          <Card>
            <Card.Body className="d-flex gap-3">
              {sellers.map((seller) => {
                return (
                  <Card key={seller.seller.id} style={{ width: "18rem" }}>
                    <Card.Header className="d-flex align-items-end">
                      <MdPerson size={28}/>
                      {seller.seller.name}
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="mb-0">
                        <b>Name:</b> {seller.seller.name}
                      </Card.Text>

                      <Card.Text className="mb-0">
                        <b>Phone:</b> {seller.seller.phone}
                      </Card.Text>

                      <Card.Text>
                        <b>Email:</b> {seller.seller.email}
                      </Card.Text>

                      <div className="d-flex align-items-center gap-2">
                        <Button variant="primary">
                          <MdAttachMoney size={25} />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}

              {sellersIsFetchedAfterMount && sellers.length === 0 && (
                <Alert variant="warning" className="m-auto">
                  No sellers around!
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
                const product = request.Product;
                return (
                  <Card key={request.id} style={{ width: "18rem" }}>
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

                      <Card.Text>
                        <b>Quantity:</b> {request.quantity}
                      </Card.Text>

                      <div className="d-flex align-items-center gap-2">
                        <Button variant="primary" disabled>
                          <MdEdit />
                        </Button>
                        {request.status == "pending" && (
                          <Button
                            variant="danger"
                            onClick={() =>
                              cancelRequestMutation.mutate(request.id)
                            }
                            disabled={cancelRequestMutation.isLoading}
                          >
                            <MdClose size={22} />
                          </Button>
                        )}
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

export default CustomerPlacePage;
