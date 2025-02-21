import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookList from "./components/BookList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderHistory from "./pages/OrderHistory";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/checkout">Checkout</Link>
          <Link to="/orders">Order History</Link> {/* Navigation Links */}
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Cart />
                <BookList />
              </>
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderHistory />} />{" "}
          {/* Order History Route */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
