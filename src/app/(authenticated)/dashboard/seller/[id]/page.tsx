"use client";

import api from "@/services/api";
import { IPostFeedbackSeller } from "@/services/api/urls/customer/types";
import { ISellerPerfil } from "@/services/api/urls/seller/types";
import { useAuthStore } from "@/store/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";

interface IProps {
  params: {
    id: string;
  };
}

function PerfilSeller({ params }: IProps) {
  const sellerId = params.id;
  const [seller, setSeller] = useState<ISellerPerfil | null>(null);
  const [show, setShow] = useState(false);
  const [customerHasFeedback, setCustomerHasFeedback] = useState(true);

  const {
    state: { user },
  } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const handleClose = () => {
    setShow(false);
    clearErrors();
    reset();
  };
  const handleShow = () => setShow(true);

  const getCustomerHasFeedback = () => {
    return api.customer.feedbackSeller.getHasFeedback(sellerId);
  };

  const { refetch: refetchCustomerHasFeedback } = useQuery(
    ["getCustomerHasFeedback"],
    getCustomerHasFeedback,
    {
      onSuccess: ({ data }) => {
        setCustomerHasFeedback(data.hasFeedback);
      },
      refetchOnWindowFocus: true,
      enabled: true,
    }
  );

  const mutation = useMutation(
    (data: IPostFeedbackSeller) => {
      return api.customer.feedbackSeller.post(data);
    },
    {
      onSuccess: () => {
        handleClose();
        refetchSellerPerfil();
        refetchCustomerHasFeedback();
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
      rating: Number(data.rating),
      comment: data.comment,
      sellerId,
    };

    mutation.mutate(payload);
  });

  const getSellerPerfil = () => {
    return api.seller.getPerfil(sellerId);
  };

  const { refetch: refetchSellerPerfil } = useQuery(
    ["getSellerPerfil"],
    getSellerPerfil,
    {
      onSuccess: ({ data }) => {
        setSeller(data.seller);
      },
      refetchOnWindowFocus: true,
      enabled: true,
    }
  );

  const deleteFeedbackMutation = useMutation(
    (id: string) => {
      return api.customer.feedbackSeller.delete(id);
    },
    {
      onSuccess: () => {
        refetchSellerPerfil();
        refetchCustomerHasFeedback();
        toast.success("Deleted successfully!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    }
  );

  const formModal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Feedback to {seller?.user.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicRating">
            <Form.Label>Rating*</Form.Label>
            <Controller
              control={control}
              name="rating"
              rules={{ required: true, min: 1 }}
              render={({ field: { value, onChange } }) => (
                <Form.Select
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.rating}
                >
                  <option value=""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Select>
              )}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRating">
            <Form.Label>Comment</Form.Label>
            <Controller
              control={control}
              name="comment"
              rules={{ required: false }}
              render={({ field: { value, onChange } }) => (
                <Form.Control
                  placeholder="Good!"
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.comment}
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
    <div className="mb-5">
      {formModal}
      {!customerHasFeedback && (
        <Button className="mb-5" variant="success" onClick={handleShow}>
          Add feedback
        </Button>
      )}

      <h3>Seller: {seller?.user.name}</h3>
      <h3>Email: {seller?.user.email}</h3>
      <h3>Phone: {seller?.phone}</h3>

      <h4 className="mt-5">Address</h4>
      <p>
        {seller?.address.street}, {seller?.address.number} -{" "}
        {seller?.address.city}/{seller?.address.state} -{" "}
        {seller?.address.zipCode}
      </p>

      {seller?.FeedbackSeller && seller?.FeedbackSeller.length > 0 && (
        <>
          <h4 className="mt-5">Feedbacks</h4>
          <div className="d-flex align-itens-center gap-3 flex-wrap">
            {seller?.FeedbackSeller.map((feedback) => (
              <Card
                key={feedback.id}
                className="p-3 d-flex justify-content-between flex-column"
                style={{ width: "18rem" }}
              >
                <div className="gap-3 d-flex justify-content-center flex-column">
                  <div>
                    <h5 className="m-0">{feedback.customer.user.name}</h5>
                    <span className="m-0">{feedback.customer.user.email}</span>
                  </div>
                  <p>{feedback.comment ? feedback.comment : "---------"}</p>
                </div>
                <div>
                  <Rating
                    initialValue={feedback.rating}
                    allowHover={false}
                    readonly
                  />
                  {feedback.customer.user.id === user?.id && (
                    <Button
                      variant="danger"
                      className="mt-2 w-100"
                      onClick={() => deleteFeedbackMutation.mutate(feedback.id)}
                      disabled={deleteFeedbackMutation.isLoading}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PerfilSeller;
