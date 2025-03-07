import React, { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/AuthContext";
import "./ChatPage.css";

const socket = io("http://localhost:5001");

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let userName = user ? user.username : localStorage.getItem("chatName");

    if (!userName) {
      userName = prompt("Enter your display name:") || "Guest";
      localStorage.setItem("chatName", userName);
    }

    setName(userName);

    // **Send Token to Server if Logged In**
    const token = localStorage.getItem("token");
    if (token && user) {
      socket.emit("authenticate", token);
    } else {
      socket.emit("setDisplayName", userName);
    }

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [user]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("sendMessage", { username: name, message });
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h2>Book Club</h2>
      <p>
        Welcome, <strong>{name}</strong>!
      </p>
      <div className="messages">
        {messages.map((msg, index) => (
          <p
            key={`${msg.username}-${msg.message}-${index}`}
            className="message"
          >
            <strong>{msg.username || "Guest"}:</strong> {msg.message || ""}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
