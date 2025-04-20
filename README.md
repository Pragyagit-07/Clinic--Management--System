# Clinic Management System

## Description
A Full Stack Web  Application to manage clinic operations, including user management, appointments, billing, and doctor-patient interactions.
## Roles
 - Doctor : View patients, add prescription, View Uppocmming Appointment
 - Receptionist : Add patients, assign tokens, generate billing

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
      
  





