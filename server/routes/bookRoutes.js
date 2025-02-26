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

/* ✅ REVIEW ROUTES HERE ✅ */

// @desc    Get Reviews for a Book
// @route   GET /api/books/:id/reviews
router.get("/:id/reviews", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book.reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Add a Review to a Book
// @route   POST /api/books/:id/reviews
router.post("/:id/reviews", async (req, res) => {
  try {
    const { user, rating, comment } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Create review object
    const newReview = { user, rating, comment, createdAt: new Date() };
    book.reviews.push(newReview);
    await book.save();

    res.status(201).json(book.reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/* ✅ CONTINUE WITH EXISTING ROUTES */

// @desc    Add NEW Book
// @route   POST /api/books
router.post("/", async (req, res) => {
  try {
    const { title, author, genre, year, price, image, description } = req.body;

    // Validate Required Fields
    if (
      !title ||
      !author ||
      !genre ||
      !year ||
      !price ||
      !image ||
      !description
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({
      title,
      author,
      genre,
      year,
      price,
      image,
      description,
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

// @desc    Delete a Review from a Book
// @route   DELETE /api/books/:bookId/reviews/:reviewId
router.delete("/:bookId/reviews/:reviewId", async (req, res) => {
  try {
    const { bookId, reviewId } = req.params;

    // Find the book
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Filter out the review to delete it
    book.reviews = book.reviews.filter(
      (review) => review._id.toString() !== reviewId
    );

    // Save the updated book without the deleted review
    await book.save();

    res.json({ message: "Review deleted successfully", reviews: book.reviews });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
