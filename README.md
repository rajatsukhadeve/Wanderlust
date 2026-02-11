# 🌍 Wanderlust – Travel Listing Web Application

Wanderlust is a full-stack travel web application that allows users to explore, create, and manage travel listings. It is built using a modern web development stack and follows an MVC-like architecture with server-side rendering.

This project demonstrates real-world features like authentication, CRUD operations, image uploads, form validation, and database integration.

---

## 🚀 Live Demo

> https://wanderlust-d22g.onrender.com/


---

## 📌 Features

- 🔐 User Authentication (Signup / Login / Logout)
- 🏡 Create, Edit, and Delete Travel Listings
- 🖼️ Image Upload for Listings
- 📄 Server-Side Rendering with EJS
- 🛡️ Protected Routes using Middleware
- 📋 Form Validation & Error Handling
- 📱 Responsive UI
- 🗄️ MongoDB Database Integration

---

## 🛠️ Tech Stack

### Frontend
- EJS (Embedded JavaScript Templates)
- HTML5
- CSS3
- Bootstrap

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Tools & Services
- Cloudinary (Image Storage)
- dotenv (Environment Variables)
- Multer (File Uploads)
- Joi / Custom Validation Schemas

---


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/rajatsukhadeve/Wanderlust.git
cd Wanderlust

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env file in the root directory and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

4️⃣ Start the Server
nodemon app.js
