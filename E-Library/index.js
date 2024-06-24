import React from 'eact';
import ReactDOM from 'eact-dom';
import BorrowedBooks from './BorrowedBooks';

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');
const borrowedBooksList = document.getElementById('borrowed-books');

searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    const response = await fetch(`http://localhost:8080/api/search?q=${searchTerm}`);
    const results = await response.json();
    searchResults.innerHTML = '';
    results.forEach((book) => {
      const bookListItem = document.createElement('li');
      bookListItem.textContent = book.title;
      searchResults.appendChild(bookListItem);
    });
  }
});

ReactDOM.render(<BorrowedBooks />, borrowedBooksList);