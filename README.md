# 🏥 Medical Automation

**Medical Automation** is a full-stack web application designed to streamline hospital workflows by providing role-based dashboards for Admins, Doctors, and Patients. The system allows for easy appointment scheduling, leave tracking, doctor-patient interaction, and profile management. 

It features secure JWT-based authentication along with Google OAuth for login, and leverages modern technologies across both frontend and backend for a scalable and maintainable architecture.

---

## 🔧 Tech Stack

| Layer       | Technology / Library                               |
|-------------|------------------------------------------------------|
| Frontend    | React.js, Vite, CSS3                                |
| Backend     | Node.js, Express.js                                 |
| Database    | MongoDB, Mongoose                                   |
| Authentication | JWT, Passport.js, Google OAuth 2.0              |
| File Upload | Multer, MongoDB GridFS Storage                      |                        |
| Dev Tools   | Nodemon, dotenv                                     |

---

## ⚙️ Backend Setup

1. Navigate to the backend folder:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Start the backend server:
```bash
nodemon app.js
```

---

## 💻 Frontend Setup

1. Navigate to the frontend folder:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

---

## 👥 Role-Based Functionalities

### 👩‍⚕️ Admin:
- Dashboard overview of doctor/patient counts and appointments
- Add, view, and delete doctor or patient users
- View all appointments and filter by doctor or patient
- Approve/reject patient leave requests
- Manage and post advisories or notices
- Edit application-level settings and configuration

### 🧑‍⚕️ Doctor:
- View scheduled appointments with patients
- Access full patient history and details
- Approve or reject patient leave applications
- Send or respond to advisory messages
- Update personal profile details
- Access patient contact information securely

### 👤 Patient:
- Book appointment slots based on doctor availability
- Apply for leave with reason and track leave status
- View medical history and advisory updates
- Edit personal profile and contact information
- Contact their assigned doctor via secure messaging
- View and manage upcoming appointments

---

## 🔐 Authentication
- Secure authentication using JWT tokens
- Google OAuth 2.0 login integration using Passport.js
- Role-based access control (Admin, Doctor, Patient)

---

## Here is the demo 



https://github.com/user-attachments/assets/07c2a9ab-96da-4617-9fe7-c44acfe305a5

