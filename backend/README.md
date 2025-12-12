# 🏠 PG Finder - Backend Server

This is the backend (server-side) code for the **PG Finder Web App**. 
It handles the database, user registration, and authentication logic.

---

## 🚀 Features Implemented (So Far)

1.  **Database Connection:** Connects successfully to **MongoDB Atlas**.
2.  **User Models:** * Distinguishes between **Students** and **Owners**.
    * Stores specific data like `College Name` for students.
3.  **Authentication:**
    * **Register:** Users can sign up. Passwords are encrypted (hashed) for safety.
    * **Login:** Users can log in and receive a secure "Token" (JWT).
4.  **Security:** Uses `bcryptjs` to protect passwords and `cors` to allow the React frontend to connect.

---

## 🛠️ Tech Stack

* **Node.js:** The runtime environment.
* **Express.js:** The web framework for creating APIs.
* **MongoDB:** The database to store user info.
* **Mongoose:** To help Node.js talk to MongoDB.

---

## 📂 Folder Structure

```text
server/
├── config/db.js            # Code to connect to MongoDB
├── controllers/authController.js # Logic for Register & Login functions
├── models/User.js          # Defines what a "User" looks like in the DB
├── routes/authRoutes.js    # API URLs (endpoints)
├── .env                    # Secret keys (Not uploaded to GitHub)
└── server.js               # Main entry file to start the server