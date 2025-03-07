# Online Bookstore: "Chapter One"

## Project Overview

**Chapter One** is a modern online bookstore that allows users to browse and purchase books while engaging in a **real-time "BookClub" chat**. The platform provides both **guest and authenticated user experiences**, enabling users to check out as guests or create an account for added features like order history and personalized chat names.

## ✨ Features

### 🛍️ **Bookstore Functionality**

- Browse and search for books.
- View detailed book descriptions and reviews.
- Add books to a cart and proceed to checkout.
- Secure payment processing with **Stripe**.

### 👤 **User Authentication**

- Sign up and log in using email and password.
- JWT-based authentication for secure user sessions.
- **Order history** for logged-in users.

### 📚 **Book Reviews**

- Users can leave reviews for books.
- Guests can leave anonymous reviews.
- Reviews appear on the book's details page.

### 💬 **BookClub Chat (Real-Time Chat)**

- **Logged-in users**: Display their username in chat.
- **Guests**: Choose a temporary display name before joining.
- **Socket.io** used for live chat functionality.

### 🛒 **Checkout & Order History**

- **Guest checkout**: Users can purchase without logging in.
- **Logged-in users**: Orders are linked to their account.
- Orders are saved in MongoDB and retrieved for user profiles.

---

## 🏗️ Tech Stack

### Frontend

- **React.js** - Component-based UI design.
- **React Router** - For seamless page navigation.
- **CSS Modules** - Responsive styling.

### Backend

- **Node.js & Express.js** - Server-side logic.
- **MongoDB & Mongoose** - Database for books, users, and orders.
- **Socket.io** - Real-time chat functionality.
- **JWT Authentication** - Secure login sessions.
- **Stripe API** - Secure payment processing.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/chapter-one-bookstore.git
cd chapter-one-bookstore
```

### 2️⃣ Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

### 3️⃣ Set Up Environment Variables

Create a **.env** file in the `server/` directory and add:

```plaintext
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 4️⃣ Start the Application

#### Run the Backend

```bash
cd server
npm start
```

#### Run the Frontend

```bash
cd client
npm start
```

---

## 📌 API Endpoints

### **Authentication** (`/api/auth`)

- **POST** `/register` - User signup.
- **POST** `/login` - User login.
- **GET** `/user` - Retrieve logged-in user details.

### **Books** (`/api/books`)

- **GET** `/` - Fetch all books.
- **POST** `/` - Add a new book (Admin feature).

### **Orders** (`/api/orders`)

- **POST** `/` - Place an order (Guest & Logged-in users).
- **GET** `/` - Get order history (Logged-in users only).

### **Payments** (`/api/payments`)

- **POST** `/` - Process Stripe payments.

### **Chat** (WebSockets - `Socket.io`)

- **sendMessage** - Broadcasts messages to all users.
- **authenticate** - Verifies and sets user identity in chat.

---

## 🎯 Future Enhancements

- **Wishlist feature** for users to save books for later.
- **Admin panel** to manage book listings and orders.
- **More payment options** like PayPal.
- **User profiles with avatars.**

---

## 💡 Contributing

Pull requests are welcome! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch (`feature-new`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-new`).
5. Open a pull request!

---

## 🔗 Contact

**Developer:** Olivia Woods  
📧 Email: [your-email@example.com](mailto:your-email@example.com)  
💼 LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)

Happy coding & happy reading! 📖✨
