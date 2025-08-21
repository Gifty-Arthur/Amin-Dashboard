import { Route, Routes } from "react-router-dom";
import SignUp from "../Component/Accounts/SignUp";
import SignIn from "../Component/Accounts/SignIn";
import Home from "../Component/Pages/HomePage/Home";
import Invoices from "../Component/Pages/Invoices/Invoices";
import DashboardLayout from "../Component/Pages/DashboardLayout ";
import Learners from "../Component/Pages/Learners/Learners";
import Courses from "../Component/Pages/Courses/Courses";
import Track from "../Component/Pages/Tracks/Track";
import OTP from "../Component/Accounts/OTP";
import ForgotPassword from "../Component/Accounts/ForgotPassword";
import Report from "../Component/Pages/Report/Report";
import TrackDetails from "../Component/Pages/Tracks/TrackDetails";

export const AdminRoutes = () => (
  <Routes>
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
);
