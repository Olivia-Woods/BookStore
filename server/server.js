require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// JSON Parsing BEFORE Defining Routes
app.use(express.json());

// Connect to MongoDB
connectDB();

// Registers bookRoutes.js File Middleware - All Routes Starting "/api/books"
app.use("/api/books", require("./routes/bookRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
