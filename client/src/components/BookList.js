import React, { useEffect, useState } from "react";
import { fetchBooks } from "../services/api";
import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBooks();
      console.log("Books in React:", data);
      setBooks(data || []);
    };
    getBooks();
  }, []);

  return (
    <div className="book-list">
      <h1>📚 Welcome to Our Bookstore</h1>
      <div className="book-grid">
        {books && books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <p className="price">${book.price.toFixed(2)}</p>
              <p>{book.description.substring(0, 100)}...</p>
              <button className="add-to-cart">Add to Cart 🛒</button>
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
