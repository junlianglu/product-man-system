# 🛍️ Product Management System

## ⚙️ Tech Stack

### Frontend

- **React 18**
- **Redux Toolkit (RTK)**
- **React Router DOM**
- **CSS Modules**
- **Vite**
- **LocalStorage**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT**
- **bcrypt.js**
- **dotenv**

---

## 🧰 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/junlianglu/product-man-system.git
cd product-man-system
```

---

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env    # Replace with your values
npm run dev             # Starts backend server on http://localhost:5001
```

> Example `.env` file:

```
MONGO_URI=mongodb://localhost:27017/product_management
PORT=5001
JWT_SECRET=your_jwt_secret_key
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev             # Starts frontend on http://localhost:5173
```

> Configure your frontend `.env` file to connect with backend:

```
VITE_API_BASE_URL=http://localhost:5001/api
```

---

### 4. Default URLs

| Service  | URL                       |
| -------- | ------------------------- |
| Frontend | http://localhost:5173     |
| Backend  | http://localhost:5001/api |

---

### 5. Notes

- The backend and frontend should run simultaneously.
- Make sure MongoDB is running locally or use a cloud database (MongoDB Atlas).
- You can modify the base URL or ports in the `.env` files.
- Recommended Node.js version: **v18 or later**.
