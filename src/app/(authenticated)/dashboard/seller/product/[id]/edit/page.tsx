"use client";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { IPostProduct } from "@/services/api/urls/seller/types";
import { convertUTCtoLocalDatetime } from "@/functions/format-datetime";

interface IProps {
  params: {
    id: string;
  };
}

function EditProductPage({ params: { id } }: IProps) {
  const { push: navigateTo } = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      startTime: "",
      endTime: "",
    },
  });

  const mutation = useMutation(
    (data: IPostProduct) => {
      return api.seller.products.put(id, data);
    },
    {
      onSuccess: () => {
        toast.success("Updated successfully!");
        navigateTo("/dashboard/seller");
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
    const payload = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      startTime: data.startTime,
      endTime: data.endTime,
    };

    mutation.mutate(payload);
  });

  function getCustomerPlace() {
    return api.seller.products.get(id);
  }

  useQuery(["getCustomerPlace"], getCustomerPlace, {
    onSuccess: ({ data }) => {
      const { product } = data;

      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("startTime", convertUTCtoLocalDatetime(new Date(product.startTime)));
      setValue("endTime", convertUTCtoLocalDatetime(new Date(product.endTime)));
      console.log(new Date(product.endTime).toLocaleString());
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return (
    <Row className="mb-3">
      <Col>
        <Card>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formProductName">
                    <Form.Label>Name</Form.Label>
                    <Controller
                      control={control}
                      name="name"
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Form.Control
                          type="text"
                          placeholder="Bread"
                          value={value}
                          onChange={onChange}
                          isInvalid={!!errors.name}
                        />
                      )}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formProductPrice">
                    <Form.Label>Price</Form.Label>
                    <Controller
                      control={control}
                      name="price"
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Form.Control
                          type="number"
                          value={value}
                          onChange={onChange}
                          isInvalid={!!errors.price}
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
                    controlId="formProductDescription"
                  >
                    <Form.Label>Description</Form.Label>
                    <Controller
                      control={control}
                      name="description"
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Form.Control
                          type="textarea"
                          value={value}
                          onChange={onChange}
                          isInvalid={!!errors.description}
                        />
                      )}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formProductStart">
                    <Form.Label>Start time</Form.Label>
                    <Controller
                      control={control}
                      name="startTime"
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Form.Control
                          type="datetime-local"
                          value={value}
                          onChange={onChange}
                          isInvalid={!!errors.name}
                        />
                      )}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3" controlId="formProductEnd">
                    <Form.Label>End time</Form.Label>
                    <Controller
                      control={control}
                      name="endTime"
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Form.Control
                          type="datetime-local"
                          value={value}
                          onChange={onChange}
                          isInvalid={!!errors.name}
                        />
                      )}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex align-items-center w-100 gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={mutation.isLoading}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  onClick={() => navigateTo("/dashboard/seller")}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default EditProductPage;
