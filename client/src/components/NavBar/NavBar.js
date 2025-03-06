import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

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
            <Link to="/bookclub">Book Club</Link>
          </li>
          <li>
            <Link to="/cart">Cart {totalItems > 0 && ` (${totalItems})`}</Link>
          </li>

          {/* Logged In: Show Order History and Logout */}
          {user ? (
            <>
              <li className="user-info">Hi, {user.username}</li>
              <li>
                <Link to="/orders">Order History</Link>{" "}
                {/* Order History Link */}
              </li>
              <li>
                <button className="logout-button" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            // Logged Out: NavBar Won't Show Login/Auth Options
            <li>
              <Link to="/auth">Account</Link> {/* Link to AuthPage */}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
