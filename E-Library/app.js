const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb+srv://e0221010:6iidyo8WQfGIMjHm@cluster0.43rzdti.mongodb.net/');
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  borrowed: Boolean,
  borrower: String
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const Book = mongoose.model('Book', bookSchema);
app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  const books = await Book.find({ $text: { $search: query } });
  res.json(books);
});
app.post('/borrow', async (req, res) => {
  const { isbn, username } = req.body;
  const book = await Book.findOne({ isbn });
  if (book.borrowed) {
    print("Book already taken");
  }
  book.borrowed = true;
  book.borrower = username;
  await book.save();
  res.json({ message: 'Book Taken' });
});
app.get('/BorrowedBooks', async (req, res) => {
  const { username } = req.query;
  const books = await Book.find({ borrower: username });
  res.json(books);
});
app.listen(8080, () => {
  console.log('Server started on port 8080');
});