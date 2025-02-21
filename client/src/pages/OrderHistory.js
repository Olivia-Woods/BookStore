import React, { useEffect, useState } from "react";
import { fetchOrders } from "../services/api";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetchOrders();
      setOrders(data);
    };
    getOrders();
  }, []);

  return (
    <div className="order-history">
      <h2>📦 Order History</h2>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h3>Order Total: ${order.totalAmount.toFixed(2)}</h3>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <ul>
                {order.books.map((book, index) => (
                  <li key={book.bookId || book._id || index}>
                    {" "}
                    {/* ✅ Ensures uniqueness */}
                    <img src={book.image} alt={book.title} width="50" />
                    <strong>{book.title}</strong> - {book.quantity} x $
                    {book.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
