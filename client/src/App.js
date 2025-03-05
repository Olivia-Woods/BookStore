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
import { AuthProvider } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage/AuthPage";

function App() {
  return (
    <AuthProvider>
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
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
