const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const authMiddleware = require("../middleware/authMiddleware");

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

// @desc    Get REVIEWS for A Book
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

// @desc    Add REVIEW to A Book (with authentication)
// @route   POST /api/books/:id/reviews
router.post("/:id/reviews", async (req, res) => {
  try {
    const { rating, comment, user } = req.body;
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    const newReview = {
      user: user || "Guest Reader",
      rating,
      comment,
    };

    book.reviews.push(newReview);
    await book.save();

    res.status(201).json({
      message: "Review added successfully",
      reviews: book.reviews,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Add NEW Book
// @route   POST /api/books
router.post("/", async (req, res) => {
  try {
    const { title, author, genre, year, price, image, description } = req.body;
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
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
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

// @desc    Delete A REVIEW From Book
// @route   DELETE /api/books/:bookId/reviews/:reviewId
router.delete("/:bookId/reviews/:reviewId", async (req, res) => {
  try {
    const { bookId, reviewId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.reviews = book.reviews.filter(
      (review) => review._id.toString() !== reviewId
    );
    await book.save();

    res.json({ message: "Review deleted successfully", reviews: book.reviews });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
