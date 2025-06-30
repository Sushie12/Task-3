const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 1, title: "Book One", author: "Author One" }
];

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { id, title, author } = req.body;
  books.push({ id, title, author });
  res.status(201).json({ message: "Book added", book: { id, title, author } });
});

app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find(b => b.id === bookId);

  if (!book) return res.status(404).json({ message: "Book not found" });

  book.title = title || book.title;
  book.author = author || book.author;

  res.json({ message: "Book updated", book });
});

app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter(b => b.id !== bookId);
  res.json({ message: `Book with ID ${bookId} deleted.` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
