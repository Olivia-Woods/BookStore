import React, { useEffect, useState } from "react";
import { fetchBooks } from "./services/api";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBooks();
      if (data) {
        setBooks(data);
      }
    };
    getBooks();
  }, []);

  return (
    <div>
      <h1>Online Bookstore 📚</h1>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <strong>{book.title}</strong> by {book.author} ({book.year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
