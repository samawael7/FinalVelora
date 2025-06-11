import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RKxYbE0HFQ2m1KqEYs4GezopmFqTpUShmtNCb36LmxdZCVTZFXKBG9g6lTaaG9AyyOXX04wAUqdXBznwl69n7Ms00k0Sw8B8z"
);

const CheckoutForm = ({ cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      // 1. Call your backend to create payment intent
      const response = await fetch(
        "https://localhost:7182/api/payment/create-or-update-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cart),
        }
      );

      const { clientSecret } = await response.json();

      // 2. Confirm the payment
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
      } else if (paymentIntent.status === "succeeded") {
        // Payment succeeded - your webhook will handle the rest
        // You might want to redirect to a success page
      }
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={!stripe || processing}>
        {processing ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

const StripePayment = ({ cart }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm cart={cart} />
  </Elements>
);

export default StripePayment;
