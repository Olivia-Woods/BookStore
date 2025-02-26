import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import BookList from "./components/BookList/BookList";
import BookDetails from "./pages/BookDetails"; // ✅ Import BookDetails
import CartPage from "./pages/CartPage";
import Checkout from "./components/Checkout/Checkout";
import OrderHistory from "./pages/OrderHistory";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
