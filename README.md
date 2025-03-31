# Online Bookstore: "Chapter One"

## Project Overview

**Chapter One** is a modern online bookstore that allows users to browse and purchase books while engaging in a **real-time "BookClub" chat**. The platform supports both **guest and authenticated user experiences**, enabling users to check out as guests or create an account for additional features like order history and personalised chat names.

## Features

### **Bookstore Functionality**

- Browse available books.
- View detailed book descriptions and user reviews.
- Add books to a cart with real-time cart updates.
- Proceed to checkout.
- Secure payment processing with **Stripe**.

### **User Authentication**

- Sign up and log in using a **username, email, and password**.
- JWT-based authentication for secure user sessions.
- **Order history** for logged-in users.

### **Book Reviews**

- Users can leave reviews for books.
- Guests can leave anonymous reviews.
- Reviews appear on the book's detail page.

### **BookClub Chat (Real-Time Chat)**

- **Logged-in users**: Display their username in chat.
- **Guests**: Choose a temporary display name before joining.
- **Socket.io** is used for live chat functionality.

### **Checkout & Order History**

- **Guest checkout**: Users can purchase books without logging in.
- **Logged-in users**: Orders are linked to their accounts.
- Orders are stored in **MongoDB** and retrieved for user profiles.

---

## Tech Stack

### **Frontend**

- **React.js** – Component-based UI design.
- **React Router** – Seamless page navigation.
- **CSS Modules** – Responsive and modular styling.

### **Backend**

- **Node.js & Express.js** – Server-side logic and API development.
- **MongoDB & Mongoose** – Database for books, users, and orders.
- **Socket.io** – Real-time chat functionality.
- **JWT Authentication** – Secure login sessions.
- **Stripe API** – Secure payment processing.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chapter-one-bookstore.git
cd chapter-one-bookstore
```

### 2. Install Dependencies

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

### 3. Set Up Environment Variables

Create a **.env** file in the `server/` directory and add:

```plaintext
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 4. Start the Application

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

## API Endpoints

### **Authentication** (`/api/auth`)

- **POST** `/register` – Register a new user.
- **POST** `/login` – User login.
- **GET** `/user` – Retrieve logged-in user details.

### **Books** (`/api/books`)

- **GET** `/` – Fetch all books.
- **GET** `/:id` – Retrieve a single book by ID.
- **GET** `/:id/reviews` – Get all reviews for a book.
- **POST** `/:id/reviews` – Add a review to a book.
- **DELETE** `/:bookId/reviews/:reviewId` – Remove a specific review from a book.
- **POST** `/` – Add a new book (Admin only).
- **PUT** `/:id` – Update book details (Admin only).
- **DELETE** `/:id` – Remove a book (Admin only).

### **Orders** (`/api/orders`)

- **POST** `/confirm` – Store an order after successful payment.
- **GET** `/` – Retrieve order history for logged-in users.

### **Payments** (`/api/payments`)

- **POST** `/` – Process payments using Stripe.

### **Chat** (WebSockets – `Socket.io`)

- **sendMessage** – Broadcast messages to all users.
- **authenticate** – Verify and set user identity in chat.

---

## Future Enhancements

- **Genre Filter** – Allow users to filter books by genre for easier browsing.
- **Admin Panel** – Provide tools for managing book listings, orders, and user accounts.
- **User Profiles with Loyalty Status** – Introduce a loyalty program to reward frequent buyers.
- **Group Chats** – Enable certain users to create and join book discussions.
- **More Payment Options** – Support additional payment methods such as PayPal.

---

## Contributing

Pull requests are welcome! To contribute:

1. **Fork** the repository.
2. **Create a new branch** (`feature-new`).
3. **Commit your changes** (`git commit -m "Add new feature"`).
4. **Push to your branch** (`git push origin feature-new`).
5. **Open a pull request** for review.

---

## Contact

👩🏽‍💻 **Developer:** Olivia Woods 2025<br>
GitHub: [github.com/Olivia-Woods]
