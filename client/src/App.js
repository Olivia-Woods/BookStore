import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar"; // ✅ Importing Navbar
import BookList from "./components/BookList";
import CartPage from "./pages/CartPage";
import Checkout from "./components/Checkout";
import OrderHistory from "./pages/OrderHistory";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      {" "}
      {/* ✅ Wraps everything inside */}
      <Router>
        <Navbar /> {/* ✅ Navbar should have access to cart context */}
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
