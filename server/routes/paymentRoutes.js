const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Process Payment (Supports Guests & Logged-in Users)
router.post("/", async (req, res) => {
  try {
    let { amount, userId } = req.body;

    console.log("Received Payment Amount:", amount);
    console.log("User ID:", userId || "Guest");

    // Validate Amount
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid payment amount." });
    }

    // Create Payment Intent with metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "aud",
      payment_method_types: ["card"],
      metadata: {
        userId: userId || "Guest",
      },
    });

    console.log("Payment Intent Created:", paymentIntent.id);

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(
      "❗️Stripe Payment Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
});

module.exports = router;
