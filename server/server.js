require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); // Create HTTP server

// Enable Front End Requests
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Registers bookRoutes.js File Middleware - All Routes Starting "/api/books"
app.use("/api/books", require("./routes/bookRoutes"));

// Order Routes - All Routes Starting "/routes/orderRoutes"
app.use("/api/orders", require("./routes/orderRoutes"));

// Payment Routes
app.use("/api/payments", require("./routes/paymentRoutes"));

// WebSocket Setup for Real-Time Chat
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // When a user sends a message, broadcast it to all clients.
  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  // User Disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
