# 🚀 Job Portal - MERN Stack Assessment

## 📌 Overview

This is a **full-stack Job Portal application** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.The application supports **role-based authentication** for **Employers** and **Job Seekers**, job postings, and job applications with dashboards for both roles.

---

## 🎯 Features

### 🔐 Authentication & Authorization
- User registration and login using JWT
- Role-Based Access Control (Employer / Job Seeker)
- Protected routes using middleware

---

### 👔 Employer Features
- Create, update, and delete job listings
- View all jobs posted by the employer
- View applicants for each job
- Employer dashboard with:
  - Active job count
  - Monthly job posting chart
  - Jobs by category chart

---

### 👨‍💼 Job Seeker Features
- Browse available job listings
- Apply for jobs
- Track applied jobs
- Job Seeker dashboard with:
  - Total applications
  - Applied / Accepted / Rejected statistics
  - Application activity chart
  - Application history table

---

### 📄 Job Applications
- Job seekers can apply for jobs
- Employers can view applicants for their jobs
- Job seekers can view their applied jobs

---

## 🛠 Tech Stack

### Frontend
- React (TypeScript)
- React Router
- Axios
- Tailwind CSS
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt

---

## ⚙️ Setup Instructions

1️ .Clone the Repository
- git clone <your-repository-url>
- cd fullStackAssignment

2 .Create a .env file:
- PORT=8000
- MONGO_URI=your_mongodb_uri
- ACCESS_TOKEN_SECRET=your_access_token_secret
- REFRESH_TOKEN_SECRET=your_refresh_token_secret

3 Start the backend server
- npm start

4 Frontend Setup
- cd FrontEnd
- npm install
- npm run dev


### 🔗 API Endpoints

### Authentication
- POST /api/v1/auth/register
- POST /api/v1/auth/login

### Jobs
- GET /api/v1/jobs
- POST /api/v1/jobs
- PUT /api/v1/jobs/:id
- DELETE /api/v1/jobs/:id

### Applications
- POST /api/v1/applications/apply/:jobId
- GET /api/v1/applications/job/:jobId
- GET /api/v1/applications/me

🌍 Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

👥 User Roles
- Role	Permissions
- Employer	Post jobs, manage listings, view applicants
- Job Seeker	Browse jobs, apply, track applications

## 🔑 Demo Credentials

## Employer
- email: employer@test.com
- password: 123456
## JobSeeker
- email: jobseeker@test.com
- password: 123456


👨‍💻 Author
Rupesh Jadhav
