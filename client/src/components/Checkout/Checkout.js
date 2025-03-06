import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const stripePromise = loadStripe(
  "pk_test_51QusBhKxx2cqYFfpNfZBECGwq11AN9oaXxUoi6Hc6OZWIz5nbRN8LRHDIJupWczqRZDaLKT6ZwHF34zECTRY1TFJ00LvQsn0hD"
);

const CheckoutForm = () => {
  const { cart, clearCart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, book) => total + book.price * (book.quantity || 1),
    0
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if (!stripe || !elements) {
      console.error("❌ ERROR: Stripe.js has not loaded yet.");
      setMessage("Payment system not ready. Please refresh and try again.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const userId = token
        ? JSON.parse(atob(token.split(".")[1])).userId
        : null;

      console.log(
        "🚀 Checkout Started | User:",
        userId || "Guest",
        "| Total Amount:",
        totalAmount
      );

      if (totalAmount < 0.5) {
        setMessage("Minimum order amount must be at least $0.50.");
        setLoading(false);
        return;
      }

      // ✅ Process Payment
      const paymentResponse = await axios.post(
        "http://localhost:5001/api/payments",
        {
          amount: totalAmount,
          userId: userId || null,
        }
      );

      const clientSecret = paymentResponse.data.clientSecret;
      console.log("💳 Received clientSecret:", clientSecret);

      if (!clientSecret) {
        console.error(
          "❌ ERROR: No clientSecret received! Payment request failed."
        );
        setMessage("Payment could not be processed. Please try again.");
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      console.log("🟢 Full Stripe Response:", JSON.stringify(result, null, 2)); // Logs full response

      if (result.error) {
        console.error("❌ ERROR: Stripe Payment Failed:", result.error.message);
        setMessage(result.error.message);
        setLoading(false);
        return;
      }

      // ✅ Check if Stripe marked the payment as "succeeded"
      if (
        !result.paymentIntent ||
        result.paymentIntent.status !== "succeeded"
      ) {
        console.error(
          "❌ ERROR: Payment was not marked as 'succeeded'!",
          result.paymentIntent
        );
        setMessage("Payment could not be completed. Please try again.");
        setLoading(false);
        return;
      }

      console.log("✅ Payment Succeeded! PaymentIntent:", result.paymentIntent);

      // ✅ Check if Payment is Successful
      if (result.paymentIntent.status !== "succeeded") {
        console.error(
          "❌ ERROR: Payment was not successful!",
          result.paymentIntent
        );
        setMessage("Payment could not be completed. Please try again.");
        setLoading(false);
        return;
      }

      console.log("✅ Payment Succeeded! PaymentIntent:", result.paymentIntent);

      setMessage("Success! Happy Reading.");

      // ✅ Store Order After Successful Payment
      const orderResponse = await axios.post(
        "http://localhost:5001/api/orders/confirm",
        {
          books: cart.map((book) => ({
            bookId: book._id,
            title: book.title,
            price: book.price,
            image: book.image,
            quantity: book.quantity || 1,
          })),
          totalAmount: totalAmount,
          userId: userId || null,
          paymentIntentId: result.paymentIntent.id,
        },
        {
          headers: token ? { Authorization: token } : {},
        }
      );

      console.log("✅ Order Successfully Stored:", orderResponse.data);

      // ✅ Clear Cart After Successful Purchase
      clearCart();

      // ✅ Redirect to Homepage
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("❌ Payment Error:", error.response?.data || error.message);
      setMessage("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <p>Total: ${totalAmount.toFixed(2)}</p>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: { base: { fontSize: "16px" } },
            hidePostalCode: true,
          }}
        />
        <button type="submit" disabled={loading || !stripe || !elements}>
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
