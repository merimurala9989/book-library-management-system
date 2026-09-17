const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

// GET all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books" });
  }
});

// POST a new book
router.post("/", async (req, res) => {
  try {
    const { title, author, category } = req.body;

if (!title || !author || !category) {
  return res.status(400).json({
    message: "Title, author and category are required",
  });
}
    const book = new Book(req.body);
    const savedBook = await book.save();

    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: "Failed to add book" });
  }
});
// DELETE a book
router.delete("/:id", async (req, res) => {
  try {
   const deletedBook = await Book.findByIdAndDelete(req.params.id);

if (!deletedBook) {
  return res.status(404).json({
    message: "Book not found",
  });
}

res.json({ message: "Book deleted successfully" });
   
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book" });
  }
});
// UPDATE a book
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
     {
  new: true,
  runValidators: true,
}
    );

    if (!updatedBook) {
  return res.status(404).json({
    message: "Book not found",
  });
}

res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Failed to update book" });
  }
});
module.exports = router;