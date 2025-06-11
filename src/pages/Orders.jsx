import React, { useEffect, useState } from "react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import { FaBoxOpen, FaArrowLeft } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import useUserOrders from "../hooks/useUserOrders";
import { useNavigate } from "react-router-dom";

const cardStyle = {
  minHeight: 120,
  background: "#fff",
  borderRadius: 18,
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  border: "1px solid #f0f0f0",
  transition: "box-shadow 0.3s, transform 0.3s",
};
const cardHoverStyle = {
  boxShadow: "0 8px 32px rgba(127,111,255,0.15)",
  transform: "translateY(-4px) scale(1.02)",
};

const Orders = () => {
  const [hovered, setHovered] = useState(null);
  const { data: orders, isLoading, error, refetch } = useUserOrders();
  const navigate = useNavigate();
  const hasOrders = orders && orders.length > 0;

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
    AOS.refresh();
  }, []);

  useEffect(() => {
    // Refetch orders when component mounts to ensure we have the latest data
    refetch();
  }, [refetch]);

  if (isLoading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-danger text-center py-5">Failed to load orders.</div>
    );

  return (
    <div className="container py-5" style={{ maxWidth: 800 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button
          variant="outline-primary"
          onClick={() => navigate(-1)}
          className="d-flex align-items-center"
        >
          <FaArrowLeft className="me-2" /> Back
        </Button>
        <h2 className="fw-bold mb-0" style={{ color: "#1d1d44" }}>
          All Orders
        </h2>
        <div style={{ width: 100 }}></div> {/* Spacer for alignment */}
      </div>

      {hasOrders ? (
        <Row xs={1} className="g-4">
          {orders.map((order, i) => (
            <Col key={order.id}>
              <div
                data-aos="fade-up"
                data-aos-delay={i * 120}
                className="h-100"
                onMouseEnter={() => setHovered(order.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <Card
                  className="order-card-anim"
                  style={
                    hovered === order.id
                      ? { ...cardStyle, ...cardHoverStyle }
                      : cardStyle
                  }
                >
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
                              : order.orderStatus === "Pending"
                              ? "warning"
                              : order.orderStatus === "PaymentReceived"
                              ? "info"
                              : "secondary"
                          }
                          className="ms-1"
                          style={{ fontSize: 12 }}
                        >
                          {order.orderStatus}
                        </Badge>
                      </div>
                      <div className="text-muted mb-1" style={{ fontSize: 13 }}>
                        {new Date(order.orderDate).toLocaleDateString()}
                      </div>
                      <div
                        className="fw-bold"
                        style={{ color: "#7f6fff", fontSize: 18 }}
                      >
                        EGP {order.total.toFixed(2)}
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
            You haven't placed any orders yet. Start shopping to see your orders
            here!
          </div>
          <Button variant="primary" onClick={() => navigate("/")}>
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default Orders;
