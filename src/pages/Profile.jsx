import React, { useEffect } from "react";
import { Card, Button, Form, Row, Col, Spinner, Badge } from "react-bootstrap";
import useUserProfile from "../hooks/useUserProfile";
import useUserOrders from "../hooks/useUserOrders";
import { FaUserCircle, FaBoxOpen } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const cardStyle = {
  minHeight: 120,
  background: "#fff",
  borderRadius: 18,
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  border: "1px solid #f0f0f0",
  transition: "box-shadow 0.3s, transform 0.3s",
};

const Profile = () => {
  const { data, isLoading, error } = useUserProfile();
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useUserOrders();

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
    AOS.refresh();
  }, []);

  if (isLoading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  if (error)
    return (
      <div className="text-danger text-center py-5">
        Failed to load profile.
      </div>
    );

  if (ordersLoading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  if (ordersError)
    return (
      <div className="text-danger text-center py-5">Failed to load orders.</div>
    );

  const { firstName, email, phoneNumber } = data || {};
  const ordersToShow = (orders || []).slice(0, 2);
  const hasOrders = orders && orders.length > 0;

  return (
    <div className="container py-5" style={{ maxWidth: 700 }}>
      <div data-aos="fade-up" className="mb-4">
        <Card
          className="shadow-lg border-0 rounded-4 p-3"
          style={{ background: "#fff" }}
        >
          <Card.Body className="d-flex flex-column align-items-center">
            <div className="mb-3">
              <div
                className="rounded-circle bg-light d-flex align-items-center justify-content-center shadow"
                style={{ width: 80, height: 80 }}
              >
                <FaUserCircle size={64} color="#7f6fff" />
              </div>
            </div>
            <h3
              className="fw-bold mb-1 text-center"
              style={{ color: "#1d1d44" }}
            >
              Welcome back, {firstName}!
            </h3>
            <div className="text-muted mb-3">{email}</div>
            <div className="w-100 mb-2">
              <Form.Group className="mb-2">
                <Form.Label className="fw-semibold">Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email || "No Provided Email"}
                  disabled
                  className="bg-light text-muted"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-semibold">Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={phoneNumber || "No Provided Phone Number"}
                  disabled
                  className="bg-light text-muted"
                />
              </Form.Group>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0" style={{ color: "#1d1d44" }}>
            Latest Orders
          </h4>
        </div>
        {hasOrders ? (
          <Row xs={1} className="g-4">
            {ordersToShow.map((order, i) => (
              <Col key={order.id}>
                <div
                  data-aos="fade-up"
                  data-aos-delay={i * 150}
                  className="h-100"
                >
                  <Card className="order-card-anim" style={cardStyle}>
                    <Card.Body className="d-flex align-items-center p-3 gap-3 flex-row">
                      {order.orderItems[0]?.pictureUrl ? (
                        <div className="flex-shrink-0">
                          <img
                            src={order.orderItems[0].pictureUrl}
                            alt={order.orderItems[0].productName}
                            className="rounded-3 shadow-sm"
                            style={{
                              width: 70,
                              height: 70,
                              objectFit: "cover",
                              background: "#f8f8f8",
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          className="flex-shrink-0 d-flex align-items-center justify-content-center bg-light rounded-3 shadow-sm"
                          style={{ width: 70, height: 70 }}
                        >
                          <FaBoxOpen size={32} color="#ccc" />
                        </div>
                      )}
                      {/* Center: Order info */}
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center mb-1">
                          <span
                            className="fw-semibold me-2"
                            style={{ fontSize: 16 }}
                          >
                            Order #{order.id.slice(0, 8)}
                          </span>
                          <Badge
                            bg={
                              order.orderStatus === "Delivered"
                                ? "success"
                                : "secondary"
                            }
                            className="ms-1"
                            style={{ fontSize: 12 }}
                          >
                            {order.orderStatus}
                          </Badge>
                        </div>
                        <div
                          className="text-muted mb-1"
                          style={{ fontSize: 13 }}
                        >
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                        <div
                          className="fw-bold"
                          style={{ color: "#7f6fff", fontSize: 18 }}
                        >
                          ${order.total}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <div
            data-aos="fade-up"
            className="d-flex flex-column align-items-center justify-content-center py-5"
          >
            <div
              className="bg-light rounded-circle d-flex align-items-center justify-content-center mb-3 shadow"
              style={{ width: 80, height: 80 }}
            >
              <FaBoxOpen size={40} color="#7f6fff" />
            </div>
            <h5 className="fw-bold mb-2" style={{ color: "#1d1d44" }}>
              No orders yet
            </h5>
            <div className="text-muted mb-3">
              You haven't placed any orders yet. Start shopping to see your
              orders here!
            </div>
            <Button
              href="/products"
              variant="primary"
              style={{
                borderRadius: 20,
                background: "#7f6fff",
                border: "none",
              }}
            >
              Shop Now
            </Button>
          </div>
        )}
        <div className="d-flex justify-content-center mt-4">
          {hasOrders && orders.length > 2 && (
            <Button
              variant="primary"
              style={{
                borderRadius: 20,
                minWidth: 160,
                fontWeight: 600,
                background: "#7f6fff",
                border: "none",
                boxShadow: "0 2px 8px rgba(127,111,255,0.10)",
              }}
              onClick={() => (window.location.href = "/orders")}
            >
              Order History
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
