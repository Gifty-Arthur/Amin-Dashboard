G-Client LMS - Admin Dashboard & Learner Website
This repository contains the complete frontend codebase for the G-Client Learning Management System (LMS). It includes two distinct applications deployed from this single repository: a comprehensive Admin Dashboard for managing the platform and a modern, user-facing website for learners.

Live Demos
This project is deployed on Vercel with two separate URLs for the different user experiences:

Learner Website: https://g-client-admin-xi.vercel.app/

Admin Dashboard: https://g-client-learner.vercel.app/

Features
Admin Dashboard
Secure Login & Authentication: Admin-only access with JWT-based authentication.

Dashboard Overview: At-a-glance view of key metrics like total learners, courses, and revenue.

Track & Course Management: Full CRUD (Create, Read, Update, Delete) functionality for managing learning tracks and individual courses.

Learner Management: View a list of all learners, see their enrollment status, and view detailed profiles.

Invoice Management: Track all invoices, view payment statuses, and manage financial records.

Learner Website
User-Friendly Interface: A modern, responsive design for learners to browse and enroll in courses.

Learner Authentication: Secure signup, login, and profile management for learners.

Course & Track Discovery: Browse available learning tracks and view detailed information, including ratings and course content.

Enrollment & Checkout: Seamless enrollment process with payment integration.

Learner Portal: A dedicated dashboard for enrolled learners to view their courses, invoices, and manage their profile settings.

Tech Stack
This project is built with a modern frontend technology stack:

Core Framework: React

Build Tool: Vite

Routing: React Router

Styling: Tailwind CSS

API Communication: Axios

State Management: React Hooks (useState, useEffect) & Context API

Deployment: Vercel

Local Setup and Installation
To run this project on your local machine, follow these steps:

1. Clone the Repository

git clone https://github.com/Gifty-Arthur/Amin-Dashboard.git
cd Amin-Dashboard

2. Install Dependencies

npm install

3. Configure Vite for Local Development

To properly proxy API requests, ensure your vite.config.js file is set up correctly:

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://tmp-se-projectapi.azurewebsites.net',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

4. Run the Development Server

To run the Learner Website locally:

npm run dev

Then open http://localhost:5173 in your browser.

To run the Admin Dashboard locally, you will need to temporarily modify src/App.jsx as described in the deployment section below.

Deployment Strategy
This project utilizes a single codebase to serve two different websites, deployed on two separate Vercel projects. The logic for determining which site to render is handled in src/App.jsx based on the browser's window.location.hostname.

A vercel.json file in the root of the project is used to handle client-side routing and API proxying on Vercel.

Vercel Configuration (vercel.json)
Create a vercel.json file in the root of your project with the following content:

{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://tmp-se-projectapi.azurewebsites.net/api/:path*"
    },
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ]
}
