import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Form,
  Spinner,
} from "react-bootstrap";
import { FaTrash, FaArrowLeft, FaCreditCard } from "react-icons/fa";
import { useCart } from "../Contexts/CartContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef } from "react";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    clearCart,
    loading,
    mergeGuestCartAfterLogin,
  } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const mergeAttempted = useRef(false);

  // Handle cart merging after login redirect
  useEffect(() => {
    const handlePostLoginCartMerge = async () => {
      // Check if user just logged in and came from cart/checkout
      if (
        location.state?.from &&
        isAuthenticated() &&
        !mergeAttempted.current
      ) {
        mergeAttempted.current = true; // Mark as attempted to prevent duplicates
        try {
          await mergeGuestCartAfterLogin();
        } catch (error) {
          console.error("Failed to merge cart after login:", error);
        } finally {
          // Clear the state to prevent re-execution
          window.history.replaceState({}, document.title);
        }
      }
    };

    // Only run once when the component mounts and has the right state
    if (location.state?.from) {
      handlePostLoginCartMerge();
    }
  }, []); // Empty dependency array to run only once

  const handleCheckout = () => {
    if (isAuthenticated()) {
      // User logged in, go to checkout directly
      navigate("/checkout");
    } else {
      // User not logged in: Save current cart to localStorage as guest cart
      localStorage.setItem("guestCart", JSON.stringify(cart));

      // Redirect to login page with return info
      navigate("/login", {
        state: {
          from: { pathname: "/cart" },
          message: "Please log in to continue with checkout",
          hasGuestCart: cart.length > 0,
        },
      });
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading your cart...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (cartCount === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-5">
                  <div className="mb-4">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#7f6fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="10" cy="20.5" r="1" />
                      <circle cx="18" cy="20.5" r="1" />
                      <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
                    </svg>
                  </div>
                  <h3 className="mb-3">Your cart is empty</h3>
                  <p className="text-muted mb-4">
                    Looks like you haven't added any items to your cart yet.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => navigate("/products")}
                      className="px-4 py-2"
                    >
                      Continue Shopping
                    </Button>
                  </motion.div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Row>
          <Col lg={8}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="mb-0">Your Cart ({cartCount} items)</h2>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={clearCart}
                    disabled={loading}
                  >
                    Clear Cart
                  </Button>
                </div>

                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => {
                        const productId = item.id || item.productId;
                        return (
                          <motion.tr
                            key={productId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src={item.pictureUrl}
                                  alt={item.name}
                                  style={{
                                    width: "60px",
                                    height: "60px",
                                    objectFit: "cover",
                                    borderRadius: "4px",
                                    marginRight: "15px",
                                  }}
                                />
                                <div>
                                  <h6 className="mb-1">{item.name}</h6>
                                  {(item.productBrand || item.brandName) && (
                                    <small className="text-muted">
                                      {item.productBrand || item.brandName}
                                    </small>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>{item.price} EGP</td>
                            <td>
                              <Form.Select
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(
                                    productId,
                                    parseInt(e.target.value)
                                  )
                                }
                                style={{ width: "70px" }}
                                disabled={loading}
                              >
                                {[...Array(10).keys()].map((num) => (
                                  <option key={num + 1} value={num + 1}>
                                    {num + 1}
                                  </option>
                                ))}
                              </Form.Select>
                            </td>
                            <td>{item.price * item.quantity} EGP</td>
                            <td className="text-end">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => removeFromCart(productId)}
                                  disabled={loading}
                                >
                                  <FaTrash />
                                </Button>
                              </motion.div>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>

            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                variant="outline-primary"
                onClick={() => navigate("/products")}
                className="d-flex align-items-center"
              >
                <FaArrowLeft className="me-2" />
                Continue Shopping
              </Button>
            </motion.div>
          </Col>

          <Col lg={4}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h3 className="mb-4">Order Summary</h3>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>{cartTotal} EGP</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>60 EGP</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fs-5 fw-bold">
                  <span>Total</span>
                  <span>{cartTotal + 60} EGP</span>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4"
                >
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={handleCheckout}
                    disabled={loading || cartCount === 0}
                  >
                    <FaCreditCard className="me-2" />
                    {loading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                    ) : null}
                    Proceed to Checkout
                  </Button>
                </motion.div>

                {!isAuthenticated() && (
                  <div className="mt-3 text-center">
                    <small className="text-muted">
                      You'll be asked to log in before checkout
                    </small>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default Cart;
