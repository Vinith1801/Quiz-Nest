# 🎯 QuizNest

**QuizNest** is a full-stack quiz application built with React, Node.js, Express, and MySQL. Designed with a sleek modern UI using TailwindCSS and Framer Motion, QuizNest offers a seamless and responsive user experience for testing knowledge across various categories.

---

## 🚀 Features

- 🔐 User Authentication (JWT-based)
- 🧠 Quiz Categories with Randomized Questions
- 📊 Real-time Leaderboard
- 🗂️ History of Past Attempts
- ⏱️ Timer-based Quiz System
- 🌙 Splash and Loading Screens
- 🧭 Protected Routes and User Profiles
- ⚙️ RESTful API Architecture

---

## 🧩 Tech Stack

### Frontend
- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (for transitions)
- Context API for State Management
- Axios for API Communication

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- JWT for Authentication

---

## 🗂️ Project Structure

```text
QuizNest/
├── database/
│   └── quiznest.sql            # SQL schema and seed data
├── frontend/                   # React frontend
│   ├── public/
│   └── src/
│       ├── api/                # Axios config
│       ├── auth/               # Auth context and route guards
│       ├── components/         # Reusable UI components
│       └── pages/              # App pages (Quiz, Login, History, etc.)
├── server/                     # Node.js backend
│   ├── config/                 # DB connection
│   ├── controllers/            # Logic for auth & quiz
│   ├── middleware/             # Auth middleware
│   ├── models/                 # Database models
│   ├── routes/                 # API routes
│   └── utils/                  # Token utilities
````

---

---

## 🛠️ Setup Instructions

### Prerequisites

* Node.js ≥ 18.x
* MySQL Server
* Vite (installed globally or via `npm create vite@latest`)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/QuizNest.git
cd QuizNest
```

### 2. Setup MySQL Database

* Import `database/quiznest.sql` into your MySQL server.
* Create a `.env` file in `/server` and configure:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=quiznest
JWT_SECRET=your_jwt_secret
```

### 3. Run the Backend

```bash
cd server
npm install
npm run dev
```

### 4. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

> These endpoints are located in `routes/` and controlled via `controllers/`.

### Auth Routes

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/auth/profile`

### Quiz Routes

* `GET /api/quiz/categories`
* `POST /api/quiz/submit-score`
* `GET /api/quiz/leaderboard`
* `GET /api/quiz/history`

---


## 🙌 Acknowledgements

* OpenAI ChatGPT for brainstorming ideas
* Tailwind UI for design inspiration
---

## 👨‍💻 Author

Made with 💡 by [Vinith](https://github.com/Vinith1801)

```
