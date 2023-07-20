/* eslint-disable react/no-unescaped-entities */
"use client";
import { FavoriteSeller } from "@/components/FavoriteSeller";
import { DELIVERY_STATUS } from "@/constants/delivery-status";
import { FormatDateTime } from "@/functions/format-datetime";
import { formatPrice } from "@/functions/format-price";
import api from "@/services/api";
import {
  IDeliveryRequest,
  SellerWithAddress,
} from "@/services/api/urls/customer/types";
import { useAuthStore } from "@/store/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import {
  MdAttachMoney,
  MdClose,
  MdDelete,
  MdEdit,
  MdPerson,
  MdSearch,
} from "react-icons/md";
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
  const [search, setSearch] = useState("");

  const {
    state: { user },
  } = useAuthStore();

  function searchSellers() {
    return api.customer.places.searchSellers(id, search);
  }

  const {
    refetch: refetchSellers,
    isFetching: isFetchingSellers,
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
          <h3 className="m-0 mb-2">Providers around</h3>
          <Form.Label>Search by date of birth</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text>
              <MdSearch />
            </InputGroup.Text>
            <Form.Control 
                type="datetime-local" 
                name="dob" 
                placeholder="Date of Birth"
                onChange={(e) => {
                  setSearch(e.target.value)
                }
                }
              />

            <Button
              variant="outline-secondary"
              onClick={() => refetchSellers()}
            >
              {isFetchingSellers ? "Loading..." : "Search"}
            </Button>
          </InputGroup>
          <Card>
            <Card.Body className="d-flex gap-3 flex-wrap">
              {sellers.map((seller) => {
                const isFavorite =
                  seller.seller.favorities.filter((f) => f === user?.id)
                    .length > 0;

                return (
                  <Card key={seller.seller.id} style={{ width: "18rem" }}>
                    <Card.Header className="d-flex align-items-end  ">
                      <MdPerson size={28} />
                      <Link href={`/dashboard/seller/${seller.seller.id}`}>
                        {seller.seller.name}
                      </Link>
                      <FavoriteSeller
                        isFavorite={isFavorite || false}
                        size={20}
                        className="ml-2"
                        readonly
                      />
                    </Card.Header>
                    <Card.Body className="d-flex flex-column justify-content-between gap-3">
                      <div>
                        <Card.Text className="mb-0">
                          <b>Name:</b> {seller.seller.name}
                        </Card.Text>

                        <Card.Text className="mb-0">
                          <b>Phone:</b> {seller.seller.phone}
                        </Card.Text>

                        <Card.Text>
                          <b>Email:</b> {seller.seller.email}
                        </Card.Text>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <Button
                          variant="primary"
                          onClick={() =>
                            navigateTo(
                              `/dashboard/customer/place/${id}/${seller.seller.id}`
                            )
                          }
                        >
                          <MdAttachMoney size={25} />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}

              {sellers.length === 0 && (
                <Alert variant="warning" className="m-auto">
                  No providers around!
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="my-5">
        <Col>
          <h3 className="m-0 mb-2">My appointments</h3>
          <Card>
            <Card.Body className="d-flex gap-3 flex-wrap">
              {requests.map((request) => {
                const product = request.Product;
                return (
                  <Card key={request.id} style={{ width: "16rem" }}>
                    <Card.Header>
                      <Alert
                        variant={DELIVERY_STATUS[request.status]}
                        className="m-auto"
                      >
                        {request.status.toUpperCase()}
                      </Alert>
                    </Card.Header>
                    <Card.Body className="d-flex flex-column justify-content-between gap-2">
                      <div>
                        <Card.Title>
                          {product?.name} -{" "}
                          {formatPrice(product?.price || 0, "en-US")}
                        </Card.Title>

                        <Card.Text>
                          <b>Provider: </b>
                          <Link
                            href={`/dashboard/seller/${request?.seller?.id}`}
                          >
                            {request?.seller?.user.name}
                          </Link>
                        </Card.Text>
                        <Card.Text className="m-0">
                          <b>Start Time:</b>{" "}
                          {FormatDateTime(request.Product!.startTime, "en-US")}
                        </Card.Text>
                        <Card.Text className="m-0 mb-1">
                          <b>End Time:</b>{" "}
                          {FormatDateTime(request.Product!.endTime, "en-US")}
                        </Card.Text>
                        <Card.Text>
                          <b>Total:</b>{" "}
                          {formatPrice(
                            product?.price!,
                            "en-US"
                          )}
                        </Card.Text>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <Button
                          variant="danger"
                          onClick={() =>
                            cancelRequestMutation.mutate(request.id)
                          }
                          disabled={
                            cancelRequestMutation.isLoading ||
                            request.status !== "requested"
                          }
                        >
                          <MdClose size={22} />
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

export default CustomerPlacePage;
