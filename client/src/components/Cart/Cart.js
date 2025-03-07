import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, book) => total + book.price, 0);

  return (
    <div className="cart">
      <h2
        style={{
          color: "black",
          fontSize: "xx-large",
          margin: "auto",
        }}
      >
        Your New Books!
      </h2>
      {cart.length === 0 ? (
        <p>Your cart is empty ☹</p>
      ) : (
        <ul>
          {cart.map((book, index) => (
            <li key={book._id || `cart-book-${index}`}>
              <img src={book.image} alt={book.title} />
              <div>
                <strong>{book.title}</strong> - ${book.price.toFixed(2)}
              </div>
              <button onClick={() => removeFromCart(book._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>
        Total:{" "}
        {new Intl.NumberFormat("en-AU", {
          style: "currency",
          currency: "AUD",
        }).format(totalPrice)}
      </h3>

      {cart.length > 0 && (
        <button
          className="checkout-button"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
