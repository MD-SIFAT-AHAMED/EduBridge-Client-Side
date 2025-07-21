# 📚 EduBridge - Online Educational Platform

EduBridge is a full-stack educational platform where:
- Teachers can create and manage classes and assignments.
- Students can purchase classes, learn, submit assignments, and give reviews.
- Admins manage users, classes, and overall platform access.

> **Live Demo**: https://edu-bridge-6a75b.web.app/  
> **Admin Login**  
> ✉️ Email: `sifat@gmail.com`  
> 🔑 Password: `12345Aa`

---

## 🚀 Features

### 👨‍🎓 Student Features
- Register & Login with Firebase Authentication
- View available classes and purchase with **Stripe payment**
- Access enrolled classes and review them
- Submit assignments created by teachers

### 👩‍🏫 Teacher Features
- Add, edit, and delete own classes
- See list of enrolled students in each class
- Create assignments for classes
- View student assignment submissions

### 🛡️ Admin Features
- Manage all users (make teacher/admin)
- Approve or reject teacher class submissions
- Manage all posted classes
- View platform statistics

---

## 🔐 Authentication & Authorization

- **Firebase Authentication** (Email/Password)
- **JWT Token** for protected API routes
- **Role-based access control**
  - Student
  - Teacher
  - Admin

---

## 💳 Payment Integration

- **Stripe** payment integration for secure class purchasing
- After successful payment:
  - Class is added to the student’s enrolled list
  - Payment history is stored

---

## 🛠️ Tech Stack

| Frontend             | Backend               |
|----------------------|------------------------|
| React.js             | Node.js               |
| React Router DOM     | Express.js            |
| Tailwind CSS         | MongoDB               |
| DaisyUI              | JWT (Json Web Token)  |
| React Icons          | Stripe                |
| Firebase Auth        |                       |
| TanStack Query       |                       |

---

## 🗂️ Project Structure

```bash
src/
├── components/       # Shared components (Navbar, Footer, etc)
├── layouts/          # MainLayout, AuthLayout, DashboardLayout
├── pages/            # All route components
│   ├── Home/
│   ├── Classes/
│   ├── Dashboard/
│   └── ...
├── hooks/            # Custom hooks (useAuth, useUserRole, useAxiosSecure)
├── context/          # AuthProvider for global state
├── routes/           # All route definitions (public/protected)
├── utils/            # Helpers, secureAxios, privateRoute, etc
└── main.jsx          # Entry point
