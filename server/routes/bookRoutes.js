const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// @desc    Get ALL Books
// @route   GET /api/books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get SINGLE Book by ID
// @route   GET /api/books/:id
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Add NEW Book
// @route   POST /api/books
router.post("/", async (req, res) => {
  try {
    const { title, author, genre, year } = req.body;

    // Validate Required Fields
    if (!title || !author || !genre || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({
      title,
      author,
      genre,
      year,
    });

    // Save Book MongoDB
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error("POST /api/books Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    UPDATE A Book
// @route   PUT /api/books/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    DELETE A Book
// @route   DELETE /api/books/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
