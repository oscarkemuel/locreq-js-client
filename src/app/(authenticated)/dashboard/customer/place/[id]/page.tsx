/* eslint-disable react/no-unescaped-entities */
'use client'
import { useRouter } from "next/navigation";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";

function CustomerPlacePage() {
  const { push: navigateTo } = useRouter()
  ;
  return (
    <>
      <Row className="mt-5">
        <Col>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h3 className="m-0">My Requests</h3>
            <Button
              disabled
              variant="success"
              onClick={() => navigateTo("/dashboard/customer/place/add")}
            >
              New Request
            </Button>
          </div>
          <Card>
            <Card.Body className="d-flex gap-3">
              {[].map((place) => {
                return (
                  <Card key={"place.id"} style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{"place.name"}</Card.Title>
                      <Card.Text className="m-0">
                        {"address.street"}, {"address.neighborhood"} -{" "}
                        {"address.number"}
                      </Card.Text>
                      <Card.Text>
                        {"address.city"} - {"address.state"}
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
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}

              {true && (
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