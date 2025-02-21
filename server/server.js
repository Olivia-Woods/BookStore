require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Enable Front End Requests
app.use(cors());
// JSON Parsing BEFORE Defining Routes
app.use(express.json());

// Connect to MongoDB
connectDB();

// Registers bookRoutes.js File Middleware - All Routes Starting "/api/books"
app.use("/api/books", require("./routes/bookRoutes"));

// Order Routes - All Routes Starting "/routes/orderRoutes"
app.use("/api/orders", require("./routes/orderRoutes"));

// Payment Routes
app.use("/api/payments", require("./routes/paymentRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
