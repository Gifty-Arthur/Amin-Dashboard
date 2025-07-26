import React from "react";

import { Route, Routes } from "react-router-dom";
import SignUp from "./Component/Accounts/SignUp";
import SignIn from "./Component/Accounts/SignIn";
import Home from "./Component/Pages/HomePage/Home";
import Invoices from "./Component/Pages/Invoices";
import DashboardLayout from "./Component/Pages/DashboardLayout ";
import Learners from "./Component/Pages/Learners";
import Courses from "./Component/Pages/Courses/Courses";
import Track from "./Component/Pages/Tracks/Track";
import OTP from "./Component/Accounts/OTP";
import AdminResetPassword from "./Component/Accounts/AdminResetPassword";
import ForgotPassword from "./Component/Accounts/ForgotPassword";
import Report from "./Component/Pages/Report/Report";
import TrackDetails from "./Component/Pages/Tracks/TrackDetails";
import AddNewTrack from "./Component/Pages/Tracks/AddNewTrack";
import EmailVerification from "./Component/Accounts/EmailVerification";

//Learners
import WebsiteLayout from "./LearnerDesktop/WebsiteLayout";
import LearnerMain from "./LearnerDesktop/LearnerHomePage/LearnerMain";
import Trek from "./Component/Pages/Tracks/Trek";
import AddCourse from "./Component/Pages/Courses/AddCourse";

function App() {
  return (
    <Routes>
      {/* Auth pages - without sidebar */}
      <Route
        path="/learner"
        element={
          <WebsiteLayout>
            <LearnerMain />
          </WebsiteLayout>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/adminresetpassword" element={<AdminResetPassword />} />

      <Route path="/reset-password/:token" element={<AdminResetPassword />} />
      <Route path="/reset-password" element={<AdminResetPassword />} />
      <Route path="/add-new-track" element={<AddNewTrack />} />
      <Route path="/add-course" element={<AddCourse />} />

      <Route
        path="/trek"
        element={
          <DashboardLayout>
            <Trek />
          </DashboardLayout>
        }
      />

      <Route
        path="/email-verification/:token"
        element={<EmailVerification />}
      />

      {/* Pages with sidebar */}
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Home />
          </DashboardLayout>
        }
      />
      <Route
        path="/invoice"
        element={
          <DashboardLayout>
            <Invoices />
          </DashboardLayout>
        }
      />
      <Route
        path="/learners"
        element={
          <DashboardLayout>
            <Learners />
          </DashboardLayout>
        }
      />
      <Route
        path="/trackdetails/:trackId" // <-- ADD THIS ROUTE
        element={
          <DashboardLayout>
            <TrackDetails />
          </DashboardLayout>
        }
      />

      <Route
        path="/track"
        element={
          <DashboardLayout>
            <Track />
          </DashboardLayout>
        }
      />

      <Route
        path="/courses"
        element={
          <DashboardLayout>
            <Courses />
          </DashboardLayout>
        }
      />

      <Route
        path="/report"
        element={
          <DashboardLayout>
            <Report />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}

export default App;
