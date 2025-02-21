import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./Checkout.css";

const stripePromise = loadStripe("your_public_key_here");

const CheckoutForm = () => {
  const { cart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const totalAmount = cart.reduce((total, book) => total + book.price, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5001/api/payments", {
        amount: totalAmount,
      });

      const clientSecret = response.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else {
        setMessage("Payment successful!");
      }
    } catch (error) {
      setMessage("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="checkout">
      <h2>💳 Checkout</h2>
      <p>Total: ${totalAmount.toFixed(2)}</p>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={loading || !stripe}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
