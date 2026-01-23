# QuickTask – Full Stack Task Manager with Analytics

QuickTask is a full-stack task management application built using the MERN stack (MongoDB, Express, React, Node.js) with an additional Python Flask-based analytics service and interactive dashboards.

This project demonstrates real-world full-stack development with authentication, CRUD operations, JWT security, REST APIs, analytics, and data visualization.

---

## 🚀 Features

### 🔐 Authentication
- User registration & login
- JWT-based secure authentication

### 📝 Task Management
- Create, update, delete tasks
- Task priority: Low, Medium, High
- Task status: Todo, In Progress, Completed

### 📊 Analytics Dashboard
- Total tasks
- Completed tasks
- Pending tasks
- Completion percentage
- Tasks completed per day (Productivity Trend)
- Task status bar chart (Todo in Yellow, Completed in Green)

### 🧠 Python Analytics Microservice
- Flask API for analytics
- MongoDB aggregation pipeline
- REST endpoints:
  - /api/analytics/user-stats
  - /api/analytics/productivity

---

## 🛠 Tech Stack

Frontend:
- React
- Axios
- Chart.js
- Tailwind CSS

Backend:
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication

Analytics Service:
- Python
- Flask
- Flask-CORS
- PyMongo

---

## 📂 Project Structure

QuickTask/
frontend/   (React UI)  
backend/    (Node.js API)  
analytics/  (Python Flask Analytics)  
README.md  
.gitignore  

---

## ⚙️ Setup Instructions

1. Clone Repository
git clone https://github.com/Revanthk1998/quicktask-analytics-dashboard.git  
cd quicktask-analytics-dashboard  

2. Backend Setup
cd backend  
npm install  
npm start  

Create .env file:
MONGO_URI=your_mongodb_url  
JWT_SECRET=your_secret  
PORT=5000  

3. Analytics Service
cd analytics  
pip install flask flask-cors pymongo  
python app.py  

4. Frontend
cd frontend  
npm install  
npm start  

---

## 📸 Screenshots
- Login Page  
- Task Dashboard  
- Analytics Charts  
- Productivity Graph  

---

## 🎯 Learning Outcomes
- Full Stack MERN Development
- REST API Design
- JWT Security
- MongoDB Aggregations
- Python Microservices
- CORS Handling
- Data Visualization
- Git & GitHub Best Practices
- Secret Management

---

## 👨‍💻 Author

Revanth Kolluru
Aspiring Software Engineer | Full Stack Developer  
GitHub: https://github.com/Revanthk1998
