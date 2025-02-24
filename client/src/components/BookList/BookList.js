import React, { useEffect, useState, useContext } from "react";
import { fetchBooks } from "../../services/api";
import { CartContext } from "../../context/CartContext";
import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]); // State: Store Book Data
  const { addToCart } = useContext(CartContext); // Access Cart Context

  // Fetch Books from API
  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBooks();
      setBooks(data || []);
    };
    getBooks();
  }, []);

  return (
    <div className="bookstore">
      {/* Hero Section with Header Image */}
      <header className="hero">
        <img src="/h1.png" alt="Chapter One" className="header-image" />
      </header>

      {/* Book Grid Display */}
      <div className="book-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="book-card">
              {/* Book Cover Image */}
              <img src={book.image} alt={book.title} />

              {/* Book Title & Author */}
              <h3>{book.title}</h3>
              <p className="author">by {book.author}</p>

              {/* Book Price */}
              <p className="price">${book.price.toFixed(2)}</p>

              {/* Shortened Book Description */}
              <p className="description">
                {book.description.substring(0, 100)}...
              </p>

              {/* Add to Cart Button */}
              <button onClick={() => addToCart(book)} className="add-to-cart">
                Add to Cart 🛒
              </button>
            </div>
          ))
        ) : (
          // No Books Available
          <p className="no-books">No books available</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
