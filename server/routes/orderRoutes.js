const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Get Orders for Logged-In User (Requires Authentication)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .populate("books.bookId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ❌ Old: Removed `POST /api/orders` (orders should only be stored after payment)
// ✅ New: Store Order After Payment is Successful
router.post("/confirm", async (req, res) => {
  try {
    const { paymentIntentId, userId, books, totalAmount } = req.body;

    console.log(
      "💾 Storing Order for Payment Intent:",
      paymentIntentId,
      "User:",
      userId || "Guest"
    );

    if (!paymentIntentId || !books || books.length === 0 || !totalAmount) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    // ✅ Create Order
    const order = new Order({
      userId: userId || null, // Guests get userId: null
      books,
      totalAmount,
      paymentIntentId,
      createdAt: new Date(),
    });

    await order.save();
    console.log("✅ Order stored in database:", order);

    res.json({ message: "Order stored successfully", order });
  } catch (error) {
    console.error("❌ Error storing order:", error);
    res
      .status(500)
      .json({ message: "Failed to store order", error: error.message });
  }
});

module.exports = router;
