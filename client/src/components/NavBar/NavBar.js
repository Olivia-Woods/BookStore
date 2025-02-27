import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./NavBar.css";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, book) => acc + (book.quantity || 1), 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src="/h1t.png" alt="Chapter One" className="logo-image" />
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Bookstore</Link>
          </li>
          <li>
            <Link to="/cart">Cart {totalItems > 0 && ` (${totalItems})`}</Link>
          </li>
          <li>
            <Link to="/orders">Order History</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
