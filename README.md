MTs Darul Ulum — UKK Management System

<div align="center">"UKK-MTSDU"

Student Submission Portal & Administrative Management System

A lightweight web-based system designed to manage UKK activities, student access, and administrative operations.

"Live Application" (https://ukk-mtsdu.vercel.app) · "Source Code" (https://github.com/jhingshaw/ukk-mtsdu)

</div>---

"01" — Overview

UKK MTsDU is a web application developed for the implementation and management of the Uji Kompetensi Keahlian (UKK) environment at MTs Darul Ulum.

The system separates the application into two primary access flows:

                         MTsDU — UKK SYSTEM
                                │
                 ┌──────────────┴──────────────┐
                 │                             │
          STUDENT PORTAL                  ADMIN PANEL
                 │                             │
          Class Access Code              Admin Access
                 │                             │
                 ▼                             ▼
        Student Dashboard             Management Dashboard
                 │                             │
                 └──────────────┬──────────────┘
                                │
                         UKK Management

The interface was designed around a minimal navy / white / gold visual system with responsive layouts and a focus on clear user flows.

---

"02" — Access Architecture

Student Portal

The student-facing interface provides an entry point for participants to access their UKK environment.

Access flow:

Class Access Code
       │
       ▼
Student Authentication
       │
       ▼
Student Dashboard
       │
       ▼
UKK Activity / Submission

The login interface is intentionally kept simple so students can access the system quickly from mobile devices.

---

Admin Panel

The administrative interface is separated from the student entry point.

Admin Access Code
       │
       ▼
Admin Authentication
       │
       ▼
Administrative Dashboard
       │
       ├── Class Management
       ├── Student / Data Management
       ├── UKK Management
       └── Recap / Monitoring

The admin interface uses a darker visual theme with gold as the primary accent to distinguish privileged access.

---

"03" — Interface

Student Portal

The student entry page provides:

- Class access code authentication
- Student dashboard entry
- Mobile-first layout
- Responsive interface
- Clear separation between student and administrator access

Admin Panel

The administrator entry page provides:

- Dedicated admin authentication
- Separate administrative environment
- Management-oriented interface
- Privileged access separation
- Responsive dashboard experience

---

"04" — Design System

The UI follows a consistent visual language across the application.

Element| Direction
Primary| Deep Navy
Accent| Gold
Surface| White / Dark Glass
Shape| Large Rounded Containers
UI| Glassmorphism
Typography| Clean Sans-serif
Layout| Responsive / Mobile-first
Interaction| Smooth transitions

The design intentionally avoids a conventional dashboard appearance and instead uses a softer glass-based interface while maintaining strong visual hierarchy.

---

"05" — Technology

Frontend
├── HTML5
├── CSS3
└── JavaScript

Deployment
└── Vercel

The project is implemented using a lightweight frontend stack without a large frontend framework.

---

"06" — Project Structure

ukk-mtsdu/
│
├── assets/
│   ├── images/
│   └── icons/
│
├── css/
│   └── *.css
│
├── js/
│   └── *.js
│
├── index.html
│
├── admin-login.html
├── admin-dashboard.html
├── admin-cek-kelas.html
├── admin-kelola-kelas.html
├── admin-nilai.html
├── admin-rekap.html
│
├── dashboard-murid.html
│
└── README.md

---

"07" — Application Flow

Student

┌─────────────────────┐
│    Student Portal   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Class Access Code  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Student Dashboard   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   UKK Activities    │
└─────────────────────┘

Administrator

┌─────────────────────┐
│     Admin Panel     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Admin Credential  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Admin Dashboard     │
└──────────┬──────────┘
           │
           ├───────────────┐
           ▼               ▼
     Data Management   UKK Management

---

"08" — Security Notes

Authentication and access control are important parts of this application because the system exposes different interfaces for students and administrators.

For a production deployment, sensitive authorization logic should be enforced on a backend rather than relying exclusively on client-side JavaScript.

Recommended hardening includes:

Authentication
    ↓
Authorization
    ↓
Input Validation
    ↓
Session Management
    ↓
Rate Limiting
    ↓
Secure Headers
    ↓
Audit Logging

«Never commit real passwords, access codes, API keys, tokens, or other secrets to the repository.»

---

"09" — Deployment

The application is deployed through Vercel.

GitHub Repository
       │
       ▼
     Vercel
       │
       ▼
Production Deployment
       │
       ▼
https://ukk-mtsdu.vercel.app

---

"10" — Local Development

Clone the repository:

git clone https://github.com/jhingshaw/ukk-mtsdu.git

Enter the project:

cd ukk-mtsdu

For local development, serve the project using a local HTTP server.

Example:

python -m http.server 8080

Then access:

http://localhost:8080

---

"11" — Screenshots

Student Portal

<img src="./assets/preview/student-login.png" alt="Student Portal" width="800">Admin Panel

<img src="./assets/preview/admin-login.png" alt="Admin Panel" width="800">«Replace the preview paths above with the actual screenshot locations in the repository.»

---

"12" — Project Status

STATUS: ACTIVE
VERSION: 2026
DEPLOYMENT: VERCEL

The system can be further extended with a dedicated backend, database integration, stronger authentication, role-based authorization, and additional administrative functionality.

---

"13" — Developer

<div align="center">JhingShaw

"Web Development" · "Security Enthusiast" · "Builder"

learn → build → test → break → improve

</div>---

<div align="center">MTs Darul Ulum — UKK Management System

Built for learning, experimentation, and real-world implementation.

</div>
