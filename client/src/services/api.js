import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/books",
});

// Get ALL Books
export const fetchBooks = async () => {
  try {
    const response = await API.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

// ADD A New Book
export const addBook = async (bookData) => {
  try {
    const response = await API.post("/", bookData);
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
  }
};

// UPDATE A Book
export const updateBook = async (id, updatedData) => {
  try {
    const response = await API.put(`/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
  }
};

// DELETE A Book
export const deleteBook = async (id) => {
  try {
    await API.delete(`/${id}`);
    return "Book deleted successfully";
  } catch (error) {
    console.error("Error deleting book:", error);
  }
};
