import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./LearnerDesktop/LeanersAccount/AuthContext";

// Import all your components
import SignUp from "./Component/Accounts/SignUp";
import SignIn from "./Component/Accounts/SignIn";
import Home from "./Component/Pages/HomePage/Home";
import Invoices from "./Component/Pages/Invoices/Invoices";
import DashboardLayout from "./Component/Pages/DashboardLayout ";
import Learners from "./Component/Pages/Learners/Learners";
import Courses from "./Component/Pages/Courses/Courses";
import Track from "./Component/Pages/Tracks/Track";
import OTP from "./Component/Accounts/OTP";
import AdminResetPassword from "./Component/Accounts/AdminResetPassword";
import ForgotPassword from "./Component/Accounts/ForgotPassword";
import Report from "./Component/Pages/Report/Report";
import TrackDetails from "./Component/Pages/Tracks/TrackDetails";
import WebsiteLayout from "./LearnerDesktop/WebsiteLayout";
import LearnerMain from "./LearnerDesktop/LearnerHomePage/LearnerMain";
import LearnerLogin from "./LearnerDesktop/LeanersAccount/LearnersLogin";
import LearnersSignUp from "./LearnerDesktop/LeanersAccount/LearnersSignUp";
import LearnsOTP from "./LearnerDesktop/LeanersAccount/LearnsOTP";
import LearnerTracks from "./LearnerDesktop/LearnerTracks/LearnerTracks";
import Portal from "./LearnerDesktop/LearnerPortal/Portal";
import LearnerDashboard from "./LearnerDesktop/LearnerPortal/LearnerDashboard";
import LearnerTrackDetails from "./LearnerDesktop/LearnerTracks/LearnerTrackDetails";
import CheckOut from "./LearnerDesktop/CheckOut/CheckOut";
import PaymentVerification from "./LearnerDesktop/CheckOut/PaymentVerification";
import ProfileSettings from "./LearnerDesktop/LearnerPortal/ProfieSettings";
import LearnerInvoice from "./LearnerDesktop/LearnerPortal/LearnerInvoice";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* --- LEARNER WEBSITE ROUTES (Using WebsiteLayout) --- */}
        <Route element={<WebsiteLayout />}>
          <Route path="/learner" element={<LearnerMain />} />
          <Route path="/learner-login" element={<LearnerLogin />} />
          <Route path="/learners-signup" element={<LearnersSignUp />} />
          <Route path="/learner-otp" element={<LearnsOTP />} />
          <Route path="/learner-tracks" element={<LearnerTracks />} />
          <Route
            path="/learner-track-details/:trackId"
            element={<LearnerTrackDetails />}
          />

          <Route path="/checkout/:trackId" element={<CheckOut />} />
          <Route
            path="/payment-verification"
            element={<PaymentVerification />}
          />

          {/* Nested Portal Routes also use the WebsiteLayout */}
          <Route path="/portal" element={<Portal />}>
            <Route index element={<LearnerDashboard />} />
            <Route path="settings" element={<ProfileSettings />} />
            <Route path="invoices" element={<LearnerInvoice />} />
          </Route>
        </Route>

        {/* --- ADMIN AUTH ROUTES (No Layout) --- */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<OTP />} />
        {/* ... other admin auth routes */}

        {/* --- ADMIN DASHBOARD ROUTES (Using DashboardLayout) --- */}
        <Route
          path="/dashboard"
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
          path="/trackdetails/:trackId"
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
    </AuthProvider>
  );
}

export default App;
