import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import BookList from "./components/BookList/BookList";
import BookDetails from "./pages/BookDetails/BookDetails";
import CartPage from "./pages/CartPage";
import Checkout from "./components/Checkout/Checkout";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import ChatPage from "./pages/ChatPage/ChatPage";
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
          <Route path="/bookclub" element={<ChatPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
