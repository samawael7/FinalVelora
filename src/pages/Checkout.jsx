import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, Card, Container, Spinner, Alert } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { useCart } from "../Contexts/CartContext.jsx";
import api from "../services/api";

const stripePromise = loadStripe(
  "pk_test_51RKxYbE0HFQ2m1KqEYs4GezopmFqTpUShmtNCb36LmxdZCVTZFXKBG9g6lTaaG9AyyOXX04wAUqdXBznwl69n7Ms00k0Sw8B8z"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setIsLoading(true);

        const cartData = {
          userId: user?.id,
          cartItems: cart.map((item) => ({
            productId: item.id || item.productId,
            productName: item.name,
            pictureName: item.pictureUrl,
            price: item.price,
            quantity: item.quantity,
            quantifier: "unit",
            transformer: "none",
            categoryName: item.category,
          })),
          deliveryMethodId: 1,
          paymentIntentId: "",
          clientSecret: "",
        };

        const response = await api.post(
          "https://localhost:7182/api/Payment/create-or-update-intent",
          cartData
        );

        setClientSecret(response.data.clientSecret);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to initialize payment");
        console.error("Payment intent error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (cart.length > 0) {
      createPaymentIntent();
    } else {
      navigate("/cart");
    }
  }, [cart, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setPaymentProcessing(true);

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment(
        {
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/orders`,
            receipt_email: user?.email,
          },
          redirect: "if_required",
        }
      );

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === "succeeded") {
        await clearCart();
        navigate("/orders", { state: { paymentSuccess: true } });
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
      console.error("Payment error:", err);
    } finally {
      setPaymentProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Preparing payment...</p>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h2 className="mb-4">Complete Your Purchase</h2>

          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <PaymentElement options={{ layout: "tabs" }} />

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/cart")}
                disabled={paymentProcessing}
              >
                Back to Cart
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={!stripe || paymentProcessing}
              >
                {paymentProcessing ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      className="me-2"
                    />
                    Processing...
                  </>
                ) : (
                  `Pay EGP ${(cartTotal + 60).toFixed(2)}`
                )}
              </button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
};

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
