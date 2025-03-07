require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);

// Debugging: Check ENV Variables Loading
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Middleware (Ensure Order)
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// Create WebSocket Server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Authenticate Users for Chat
  socket.on("authenticate", (token) => {
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.username = decoded.username;
      }
    } catch (error) {
      console.error("JWT Auth Error:", error.message);
      socket.username = null;
    }
  });

  // Handle Guests Entering Chat
  socket.on("setDisplayName", (displayName) => {
    if (!socket.username) {
      socket.username = displayName || "Guest";
    }
  });

  // Handle Sending Messages
  socket.on("sendMessage", (data) => {
    console.log("Message received:", data);
    const message = data?.message || "No message";
    const username = socket.username || "Guest";

    io.emit("receiveMessage", { username, message });
  });

  // Handle User Disconnecting
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
