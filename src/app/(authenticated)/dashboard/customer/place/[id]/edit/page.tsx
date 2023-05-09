"use client";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { IPostCustomerPlace } from "@/services/api/urls/customer/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "@/services/api";
import { useRouter } from "next/navigation";

interface IProps {
  params: {
    id: string;
  }
}

function EditCustomerPlace({ params: { id } }: IProps) {
  const { push: navigateTo } = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      name: "",
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
    (data: IPostCustomerPlace) => {
      return api.customer.places.put(id, data);
    },
    {
      onSuccess: () => {
        toast.success("Updated successfully!");
        navigateTo('/dashboard/customer')
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

  function getCustomerPlace() {
    return api.customer.places.get(id);
  }

  useQuery(['getCustomerPlace'], getCustomerPlace, {
    onSuccess: ({ data }) => {
      const { place } = data
      const { address } = place

      setValue('name', place.name)
      setValue('address', address)
    },
    enabled: !!id,
  })

  return (
    <Row className="mb-3">
      <Col>
        <Card>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Col>
                <Form.Group className="mb-3" controlId="formPlaceName">
                  <Form.Label>Place name</Form.Label>
                  <Controller
                    control={control}
                    name="name"
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Form.Control
                        type="text"
                        placeholder="My house"
                        value={value}
                        onChange={onChange}
                        isInvalid={!!errors.name}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
              <hr />
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="formPlaceAddressStreet"
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
                    controlId="formPlaceAddressNumber"
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
                    controlId="formPlaceAddressZipCode"
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
                    controlId="formPlaceAddressNeighborhood"
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
                  <Form.Group className="mb-3" controlId="formPlaceAddressCity">
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
                    controlId="formPlaceAddressState"
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
                    controlId="formPlaceAddressComplement"
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

              <div className="d-flex align-items-center w-100 gap-2">
                <Button variant="primary" type="submit" disabled={mutation.isLoading}>
                  Edit
                </Button>

                <Button variant="danger" onClick={() => navigateTo('/dashboard/customer')}>
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

export default EditCustomerPlace;
