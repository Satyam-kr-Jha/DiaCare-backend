# 🩺 DiaCare - Smart Diabetes Health Monitoring System

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-green?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Authentication-purple)

## 📖 Overview

**DiaCare** is a full-stack healthcare platform designed to help patients monitor their health while enabling doctors to manage patient information efficiently.

The platform provides real-time health monitoring by integrating IoT hardware with a modern web dashboard. Patients can view their vital signs, maintain health records, upload medical reports, schedule appointments, and receive personalized health insights. Doctors can securely access patient information, review uploaded reports, monitor health trends, and manage appointments.

---

## 🚀 Features

### 👤 Patient Portal

- Secure Authentication (Login & Signup)
- Personalized Dashboard
- View Heart Rate
- View Blood Pressure
- Monitor Blood Oxygen (SpO₂)
- Glucose Trend Monitoring
- Daily Health Logs
- Upload Medical Reports
- Download Previous Reports
- Book Doctor Appointments
- Appointment History
- Medication Reminders
- Diet Recommendations
- Health Summary Dashboard
- Interactive Charts & Graphs
- Profile Management

---

### 👨‍⚕️ Doctor Portal

- Secure Doctor Login
- View Assigned Patients
- Access Patient Profiles
- Review Uploaded Medical Reports
- Monitor Patient Vital Signs
- Analyze Health Trends
- Appointment Management
- Patient Health History
- Dashboard Overview

---

## 📊 Dashboard Features

- Heart Rate Monitoring
- Blood Pressure Monitoring
- Blood Oxygen (SpO₂)
- Glucose Trends
- Activity Tracking
- Medication Tracking
- Health Summary
- Interactive Charts
- Report Management

---

## ⚙️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Tailwind CSS
- Axios
- Recharts
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Parser
- Multer
- bcrypt

### Database

- MongoDB Atlas

### Hardware Integration

- ESP32
- MAX30102 Sensor
- IoT-Based Health Monitoring
- Firebase Realtime Database

---

## 🏗️ Project Structure

```
DiaCare
│
├── frontend
│   ├── src
│   ├── assets
│   ├── pages
│   ├── components
│   └── services
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   └── uploads
│
└── README.md
```

---

## 🔒 Authentication

The application uses **JWT-based Authentication** with secure HTTP cookies.

Supported Roles:

- Patient
- Doctor

Role-based access ensures that each user can only access authorized resources.

---

## 📷 Screenshots
### SignUp Page
<img width="1366" height="728" alt="signup" src="https://github.com/user-attachments/assets/f2f92957-991d-4909-944e-5a60b3e30ade" />

### Patient Dashboard
<img width="1366" height="728" alt="home" src="https://github.com/user-attachments/assets/160bd497-e8a2-4997-ba99-3fe4cf94a1bf" />

### Report Dashboard
<img width="1366" height="728" alt="healthLogs" src="https://github.com/user-attachments/assets/159d2ee7-d137-4d57-a31c-fdbef07369c1" />

### Patient Profile
<img width="1366" height="728" alt="profile" src="https://github.com/user-attachments/assets/2d1c9f2f-f0de-4eee-91f4-d431d99895e4" />

### Doctor Dashboard
<img width="1366" height="728" alt="doc-home" src="https://github.com/user-attachments/assets/9414de75-3eda-4d46-86eb-b6097d2c9ce1" />

### Appointments
<img width="1366" height="728" alt="doc-dashboard" src="https://github.com/user-attachments/assets/04b71c60-2c7b-4e8e-ae59-292c68c9e5c6" />

---

## 📄 License

This project is developed for educational and research purposes.

---

## 👨‍💻 Author

**Satyam Kumar Jha**

- B.Tech Electronics & Communication Engineering
- Full Stack Developer
- IoT Enthusiast

---

⭐ If you found this project helpful, consider giving it a Star on GitHub.
