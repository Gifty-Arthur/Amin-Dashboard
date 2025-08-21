import React from "react";
import { Routes, Route } from "react-router-dom";

// Import all your layout and page components
import LearnerMain from "../LearnerDesktop/LearnerHomePage/LearnerMain";
import WebsiteLayout from "../LearnerDesktop/WebsiteLayout";
import LearnerTrackDetails from "../LearnerDesktop/LearnerTracks/LearnerTrackDetails";
import CheckOut from "../LearnerDesktop/CheckOut/CheckOut";
import PaymentVerification from "../LearnerDesktop/CheckOut/PaymentVerification";
import Portal from "../LearnerDesktop/LearnerPortal/Portal";
import LearnerDashboard from "../LearnerDesktop/LearnerPortal/LearnerDashboard";
import ProfileSettings from "../LearnerDesktop/LearnerPortal/ProfieSettings";
import LearnerInvoice from "../LearnerDesktop/LearnerPortal/LearnerInvoice";
import LearnersLogin from "../LearnerDesktop/LeanersAccount/LearnersLogin";
import LearnersSignUp from "../LearnerDesktop/LeanersAccount/LearnersSignUp";
import LearnsOTP from "../LearnerDesktop/LeanersAccount/LearnsOTP";
import LearnerTracks from "../LearnerDesktop/LearnerTracks/LearnerTracks";

export const LearnerRoutes = () => (
  <Routes>
    {/* All routes inside here will share the same main layout (Navbar, Footer) */}
    <Route element={<WebsiteLayout />}>
      <Route path="/learner" element={<LearnerMain />} />
      <Route path="/learner-login" element={<LearnersLogin />} />
      <Route path="/learners-signup" element={<LearnersSignUp />} />
      <Route path="/learner-otp" element={<LearnsOTP />} />
      <Route path="/learner-tracks" element={<LearnerTracks />} />
      <Route
        path="/learner-track-details/:trackId"
        element={<LearnerTrackDetails />}
      />
      <Route path="/checkout/:trackId" element={<CheckOut />} />
      <Route path="/payment-verification" element={<PaymentVerification />} />

      {/* Nested Portal Routes also use the main WebsiteLayout */}
      <Route path="/portal" element={<Portal />}>
        <Route index element={<LearnerDashboard />} />
        <Route path="settings" element={<ProfileSettings />} />
        <Route path="invoices" element={<LearnerInvoice />} />
      </Route>
    </Route>
  </Routes>
);
