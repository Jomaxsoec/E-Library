import React, { useState, useEffect } from 'eact';
import axios from 'axios';

const BorrowedBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      const response = await axios.get('http://localhost:8080/api/borrowed', {
        params: { username: 'William Aften' }
      });
      setBooks(response.data);
    };
    fetchBorrowedBooks();
  }, []);

  return (
    <div>
      <h1>Borrowed Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h2>{book.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BorrowedBooks;