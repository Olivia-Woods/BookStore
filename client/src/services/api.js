import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

// Get ALL Books
export const fetchBooks = async () => {
  try {
    const response = await API.get("/books");
    console.log("Backend Response:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

// ADD A New Book
export const addBook = async (bookData, token) => {
  try {
    const response = await API.post("/books", bookData, {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    return null;
  }
};

// UPDATE A Book
export const updateBook = async (id, updatedData, token) => {
  try {
    const response = await API.put(`/books/${id}`, updatedData, {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    return null;
  }
};

// DELETE A Book
export const deleteBook = async (id, token) => {
  try {
    await API.delete(`/books/${id}`, {
      headers: token ? { Authorization: token } : {},
    });
    return "Book deleted successfully";
  } catch (error) {
    console.error("Error deleting book:", error);
    return "Error deleting book";
  }
};

// Get ALL Orders
export const fetchOrders = async (token) => {
  try {
    const response = await API.get("/orders", {
      headers: token ? { Authorization: token } : {},
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
