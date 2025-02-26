import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./BookDetails.css";

const BookDetails = () => {
  const { id } = useParams(); // Get book ID from URL
  const { addToCart } = useContext(CartContext);
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`http://localhost:5001/api/books/${id}`);
      const data = await response.json();
      setBook(data);
      setReviews(data.reviews || []);
    };
    fetchBook();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      user: "Guest Reader",
      rating: parseInt(rating),
      comment,
    };

    const response = await fetch(
      `http://localhost:5001/api/books/${id}/reviews`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      }
    );

    if (response.ok) {
      setReviews([...reviews, newReview]); // Update UI without refresh
      setRating("");
      setComment("");
    }
  };

  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="book-details">
      <img src={book.image} alt={book.title} className="book-image" />
      <div className="book-info">
        <h1>{book.title}</h1>
        <p className="author">by {book.author}</p>
        <p className="price">${book.price.toFixed(2)}</p>
        <p className="description">{book.description}</p>
        <button onClick={() => addToCart(book)} className="add-to-cart">
          Add to Cart 🛒
        </button>
        <Link to="/">Back to Store</Link>
      </div>

      {/* Reviews Section */}
      <div className="reviews">
        <h2>Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first bookworm to leave one! 📖</p>
        ) : (
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <strong>{review.user}</strong> ⭐ {review.rating}/5
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        )}

        {/* Submit Review */}
        <form onSubmit={handleReviewSubmit}>
          <div className="rating-input">
            <label>Rating:</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>
          <div className="comment-submit">
            <input
              type="text"
              placeholder="Write a review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button type="submit">Submit Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookDetails;
