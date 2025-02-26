import React, { useEffect, useState, useContext } from "react";
import { fetchBooks } from "../../services/api";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]); // Store book data
  const { addToCart } = useContext(CartContext); // Access Cart Context
  const [openReviews, setOpenReviews] = useState({}); // Track which books have open reviews

  // Fetch Books from API
  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBooks();
      setBooks(data || []);
    };
    getBooks();
  }, []);

  // Toggle Reviews Visibility
  const toggleReviews = (bookId) => {
    setOpenReviews((prev) => ({
      ...prev,
      [bookId]: !prev[bookId], // Toggle state for this book
    }));
  };

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
              <Link to={`/book/${book._id}`}>
                <img src={book.image} alt={book.title} className="book-image" />
              </Link>

              {/* Book Title & Author */}
              <h3>
                <Link to={`/book/${book._id}`} className="book-title">
                  {book.title}
                </Link>
              </h3>

              {/* Book Price */}
              <p className="price">${book.price.toFixed(2)}</p>

              {/* Shortened Book Description */}
              <p className="description">
                {book.description.substring(0, 100)}...
              </p>

              {/* Toggle Reviews Section */}
              <p
                className="toggle-reviews"
                onClick={() => toggleReviews(book._id)}
              >
                Reviews {openReviews[book._id] ? "↑" : "↓"}
              </p>

              {openReviews[book._id] && (
                <div className="reviews">
                  {book.reviews && book.reviews.length > 0 ? (
                    book.reviews.map((review, index) => (
                      <p key={index}>
                        <strong>{review.user}:</strong> {review.comment} ⭐{" "}
                        {review.rating}/5
                      </p>
                    ))
                  ) : (
                    <p>No reviews yet.</p>
                  )}

                  {/* Review Submission Form */}
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const newReview = {
                        user: "Guest Reader",
                        rating: parseInt(e.target.rating.value),
                        comment: e.target.comment.value,
                      };

                      const response = await fetch(
                        `http://localhost:5001/api/books/${book._id}/reviews`,
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(newReview),
                        }
                      );

                      if (response.ok) {
                        alert("Review added!");
                        window.location.reload(); // Refresh to show the new review
                      }
                    }}
                  >
                    <label>Rating (1-5):</label>
                    <input
                      type="number"
                      name="rating"
                      min="1"
                      max="5"
                      required
                    />

                    <label>Comment:</label>
                    <input type="text" name="comment" required />

                    <button type="submit">Submit Review</button>
                  </form>
                </div>
              )}

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
