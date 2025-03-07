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
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="content">
              <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/bookclub" element={<ChatPage />} />
                <Route path="/auth" element={<AuthPage />} />
              </Routes>
            </main>
            <footer
              style={{
                textAlign: "center",
                padding: "10px",
                color: "#333",
                fontSize: "14px",
                width: "100%",
              }}
            >
              <p>© 2025 Chapter One. All Rights Reserved.</p>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
