import React, { useEffect, useState, useContext } from "react";
import { fetchBooks } from "../services/api";
import { CartContext } from "../context/CartContext";
import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBooks();
      setBooks(data || []);
    };
    getBooks();
  }, []);

  return (
    <div className="book-list">
      <h1>📚 Welcome to Our Bookstore</h1>
      <div className="book-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <p className="price">${book.price.toFixed(2)}</p>
              <p>{book.description.substring(0, 100)}...</p>
              <button onClick={() => addToCart(book)} className="add-to-cart">
                Add to Cart 🛒
              </button>
            </div>
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
