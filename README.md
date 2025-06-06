# Clinic Management System

## Description
A Full Stack Web  Application to manage clinic operations, including user management, appointments, billing, and doctor-patient interactions.
## Roles
 - Doctor : View patients, add prescription, View Upcomming Appointment
 - Receptionist : Add patients, assign tokens, generate billing.
 - admin : Add doctor, add receptionist, view reports, analysis

## Tech Stack
- React.js(Frontend)
- Node.js / Express (Backend)
- Firebase (Authentication & Firestore)
- CSS Modules
- Winston for logging
- vercel for  frontend deployment
- Render for backend deployment

## Features
- Home Page
-  Secure login
- Token generation
- Patient data & history
- Prescription handling
- Logging for every action
- Firebase Firestore for DB

##  Test Cases
-     Login
-     Token Generation
-     Add Prescription
-     View Patient History

## Getting Started
## Installation & Set up steps
- clone the repository and install dependencies for frontend and backend both:
  ###  Backend Environment Variable Setup

   On **Render**, create the following environment variable:

 - **Key**: `FIREBASE_CONFIG`
 - **Value**: Paste the entire contents of your `serviceAccountKey.json` file as a one-liner JSON string.

❗️**Important:** Do not commit or push your actual Firebase config or secret key to GitHub. Keep it secure in your Render settings.

  ### Backend
    --bash
  - cd Backend
  - npm install
  - npm run dev
  ### frontend
   --bash
  - cd Frontend
  - npm install
  - npm run dev

## Deployment
### Frontend Deployment: Vercel
- the frontend is hosted on [Vercel](https://vercel.com).
- Acsess the live app :[https://clinic-management-system-git-main-pragyas-projects-35058125.vercel.app](https://clinic-management-system-git-main-pragyas-projects-35058125.vercel.app)

### Backend Deployment : Render
- The backend API is hosted on [Render](https://render.com).
- API is accessible at :[https://clinic-management-system-eyaw.onrender.com](https://clinic-management-system-eyaw.onrender.com)

   ## Deployment  Instructions
  ### Frontend
  - Deployed using vercel
  - github repo connected
  - Disabled vercel authentication" To make Public"
  - main branch deployed to production
    
    ### Backend
    - Deployed using render
    - Runtime: Node.js
    - set firebase_config as an enviornment variable
    - Auto deployed From Github enabled.
      
     ## Folder Structure
 
 ```
  
Clinic--Management--System
├── Backend
│   ├── config
│   │   └── firebase.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── billingController.js
│   │   ├── doctorController.js
│   │   └── receptionistController.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── billingRoutes.js
│   │   ├── doctorRoutes.js
│   │   └── receptionistRoutes.js
│   ├── services
│   │   └── tokenService.js
│   ├── serviceAccountKey.js  #  Secret file (not pushed to GitHub)
│   └── index.js
├── Frontend
│   ├── src
│   │   ├── auth
│   │   │   └── AuthService.js
│   │   ├── components
│   │   │   ├── About.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── BillingForm.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── DoctorDashboard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PatientBillingHistory.jsx
│   │   │   ├── PatientList.jsx
│   │   │   ├── ReceptionistDashboard.jsx
│   │   │   ├── SignUp.jsx
│   │   │   └── TokenGenerator.jsx
│   │   ├── services
│   │   │   └── firebase.jsx
│   │   ├── styles
│   │   │   ├── About.css
│   │   │   ├── App.css
│   │   │   ├── AdminPanel.css
│   │   │   ├── BillingForm.css
│   │   │   ├── Contact.css
│   │   │   ├── DoctorDashboard.css
│   │   │   ├── Footer.css
│   │   │   ├── Header.css
│   │   │   ├── Home.css
│   │   │   ├── Login.css
│   │   │   ├── PatientBillingHistory.css
│   │   │   ├── PatientList.css
│   │   │   ├── ReceptionistDashboard.css
│   │   │   ├── SignUp.css
│   │   │   ├── TokenGenerator.css
│   │   │   └── index.css
│   │   ├── utils
│   │   │   └── logger.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
├── README.md
├── LICENSE
├── .gitignore

```


## System Architectue
![System Architecture](System_Architecture.pdf.pdf)

## Low-level Design(LLD)
view this full LLD document here[LLD Design- Clinic Management System](https://github.com/Pragyagit-07/Clinic--Management--System/blob/main/Complete%20_solutionLLD%20Document.docx.pdf)

    

  ## 🔄 Project Workflow

```mermaid

graph TD
  A[Receptionist Adds Patient Info] --> B[Token Generated]
  B --> C[Data Stored in Firebase]
  C --> D[Doctor Views Patient Info]
  D --> E[Doctor Adds Prescription]
  E --> F[History Saved & Sent to Receptionist]


```




## Optimization of Solution
### Code-Level 
 - Used Modular Structure to keep Components reusable and testable
 - Implemented logging using winston for all major actions

### Architecture-Level
- Backend deployed on Render (Scalable and serverless)
- Frontend hosted on vercel ( fast CI/CD deployment)
- Firebase firestore indexing applied for faster DB reads

### Performance 
- Lazy -loaded React components
- Applied caching using browser local storage where appropriate

 













      
  





