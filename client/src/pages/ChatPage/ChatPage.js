import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./ChatPage.css";

const socket = io("http://localhost:5001");

const ChatPage = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Ask for a display name when the user joins the chat
    let userName =
      localStorage.getItem("chatName") || prompt("Enter your display name:");

    if (!userName || userName.trim() === "") {
      userName = "Guest"; // Default to "Guest" if left blank
    }

    setName(userName);
    localStorage.setItem("chatName", userName); // Save name in local storage

    // Notify server of new user
    socket.emit("joinChat", { name: userName });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const chatMessage = { name, text: message };
      socket.emit("sendMessage", chatMessage);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h2>Book Club</h2>
      <h3>Remember to be kind!</h3>
      <p>
        Welcome, <strong>{name}</strong>!
      </p>
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index} className="message">
            <strong>{msg.name}:</strong> {msg.text}
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
