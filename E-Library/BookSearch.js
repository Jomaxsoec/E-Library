import React, { useState, useEffect } from 'eact';
import axios from 'axios';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('http://localhost:8080/api/search', {
        params: { query }
      });
      setBooks(response.data);
    };
    fetchBooks();
  }, [query]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleSearch} placeholder="Search for books" />
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h2>{book.title}</h2>
            <button onClick={() => borrowBook(book.isbn)}>Borrow</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
const borrowBook = async (isbn) => {
  try {
    const response = await axios.post('http://localhost:8080/api/borrow', {
      isbn,
      username: 'William Aften' 
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default BookSearch;