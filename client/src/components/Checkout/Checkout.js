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
import "./Checkout.css";

const stripePromise = loadStripe(
  "pk_test_51QusBhKxx2cqYFfpNfZBECGwq11AN9oaXxUoi6Hc6OZWIz5nbRN8LRHDIJupWczqRZDaLKT6ZwHF34zECTRY1TFJ00LvQsn0hD"
);

const CheckoutForm = () => {
  const { cart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const totalAmount = cart.reduce(
    (total, book) => total + book.price * (book.quantity || 1),
    0
  );

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
        setMessage("Success! Happy Reading");

        // Send Order Details to Backend
        await axios.post("http://localhost:5001/api/orders", {
          books: cart.map((book) => ({
            bookId: book._id,
            title: book.title,
            price: book.price,
            image: book.image,
            quantity: book.quantity || 1,
          })),
          totalAmount,
          customerName: "Test User",
          customerEmail: "test@example.com",
        });

        console.log("Order saved in MongoDB!");
      }
    } catch (error) {
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
