<div align="center">
  
# 🚀 ProjectPort

### *AI-Powered Project Submission & Plagiarism Detection Platform*

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&loxgo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![HuggingFace](https://img.shields.io/badge/🤗_HuggingFace-ML_API-FFD21E?style=for-the-badge)](https://huggingface.co/)

<p align="center">
  <strong>A seamless platform for submitting, showcasing, and exploring peer projects in real-time with AI-driven duplicate detection.</strong>
</p>

</div>

---

## 📌 Problem Statement

Academic institutions often struggle with:
- **Duplicate project submissions** - Students unknowingly propose similar ideas
- **Manual verification** - Faculty spending hours checking for plagiarism
- **Scattered submissions** - No centralized platform for project tracking
- **Lack of transparency** - Students can't explore peer projects for inspiration

**ProjectPort solves this** by providing an intelligent, centralized platform with AI-powered similarity detection.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
|  **AI Duplicate Detection** | Uses HuggingFace ML models to detect similar project ideas with 65%+ threshold |
|  **Project Registration** | Students register ideas with name, URN, batch, and detailed description |
|  **Project Submission** | Submit completed projects with GitHub & hosting links |
|  **Smart Search & Filter** | Search by name/description/student and filter by batch |
|  **Real-time Dashboard** | Visual separation of Registered vs Submitted projects |
|  **Deadline Countdown** | Live countdown timer for submission deadlines |
|  **Admin Panel** | JWT-authenticated admin for CRUD operations |
|  **Responsive Design** | Modern UI with Framer Motion animations |

---

## 🛠 Tech Stack

### Frontend
```
React 19       → Modern UI with Hooks
Vite           → Lightning-fast build tool
Tailwind CSS 4 → Utility-first styling
Framer Motion  → Smooth animations
React Router 7 → Client-side routing
```

### Backend
```
Node.js        → Runtime environment
Express.js     → REST API framework
MongoDB        → NoSQL database
Mongoose       → ODM for MongoDB
JWT            → Secure authentication
bcrypt.js      → Password hashing
```

### AI/ML Integration
```
HuggingFace API → Text similarity model for duplicate detection
Custom Model    → Deployed on HuggingFace Spaces
```

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │    Home     │  │  Register   │  │        Submit           │ │
│  │  Dashboard  │  │    Form     │  │         Form            │ │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘ │
└─────────┼────────────────┼─────────────────────┼───────────────┘
          │                │                     │
          ▼                ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BACKEND (Express.js)                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    REST API Routes                       │   │
│  │   /api/projects     /api/projects/register   /api/admin  │   │
│  └───────────────────────────┬─────────────────────────────┘   │
│                              │                                  │
│  ┌───────────────────────────┼───────────────────────────────┐ │
│  │              Controllers & Middleware                     │ │
│  │    projectController    adminController    authMiddleware │ │
│  └───────────────────────────┬───────────────────────────────┘ │
└──────────────────────────────┼──────────────────────────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│    MongoDB      │  │  HuggingFace    │  │      JWT        │
│    Database     │  │   ML Model      │  │  Authentication │
│  (Projects,     │  │  (Similarity    │  │                 │
│   Admins)       │  │   Detection)    │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```







---



## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- HuggingFace API access

### Backend Setup
```bash
cd Backend
npm install

# Create .env file
echo "PORT=5000
MONGO_CONNECTION_STRING=mongodb+srv://...
JWT_SECRET=your_jwt_secret
HUGGINGFACE_API_KEY=your_hf_key" > .env

# Start server
npm run dev
```

### Frontend Setup
```bash
cd Frontend/ideavault
npm install
npm run dev
```

---

## 📁 Project Structure

```
ProjectPort/
├── Backend/
│   ├── config/
│   │   └── dbConnection.js      # MongoDB connection
│   ├── controllers/
│   │   ├── projectController.js # Project CRUD + AI check
│   │   └── adminController.js   # Admin authentication
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT verification
│   ├── models/
│   │   ├── project.js           # Project schema
│   │   └── Admin.js             # Admin schema + bcrypt
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   └── openaiHelper.js      # HuggingFace integration
│   └── server.js
│
└── Frontend/ideavault/
    └── src/
        ├── components/
        │   ├── Home.jsx         # Dashboard with search/filter
        │   ├── Registration.jsx # Project registration form
        │   ├── Submission.jsx   # Project submission form
        │   ├── Deadline.jsx     # Countdown timer
        │   └── Navbar.jsx
        ├── App.jsx
        └── main.jsx
```





---

## 🎯 What This Project Demonstrates

| Skill | Implementation |
|-------|----------------|
| **Full-Stack Development** | React frontend + Node/Express backend |
| **Database Design** | MongoDB with Mongoose ODM |
| **Authentication** | JWT + bcrypt password hashing |
| **AI/ML Integration** | HuggingFace API for NLP tasks |
| **API Design** | RESTful endpoints with proper status codes |
| **Modern React** | Hooks, functional components, React 19 |
| **State Management** | useState, useEffect patterns |
| **UI/UX** | Responsive design, animations, loading states |
| **Error Handling** | Try-catch, user-friendly error messages |
| **Code Organization** | MVC architecture, separation of concerns |

---

## 🤝 Contributors

- **[Manthan Subhash](https://github.com/manthansubhash01)** - Original Author
- **[Sravanth Varri](https://github.com/SravanthDev)** - Contributor

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

