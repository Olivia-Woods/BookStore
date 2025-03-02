const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// @desc    Place Order
// @route   POST /api/orders
router.post("/", async (req, res) => {
  try {
    const { books, totalAmount, customerName, customerEmail } = req.body;

    if (
      !books ||
      books.length === 0 ||
      !totalAmount ||
      !customerName ||
      !customerEmail
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({
      books,
      totalAmount,
      customerName,
      customerEmail,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("POST /api/orders Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Get ALL Orders (Sorted by Latest)
// @route   GET /api/orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("books.bookId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
