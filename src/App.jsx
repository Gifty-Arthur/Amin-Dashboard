import React from "react";
import { AuthProvider } from "./LearnerDesktop/LeanersAccount/AuthContext";
import { AdminRoutes } from "./Component/AdminRoutes";
import { LearnerRoutes } from "./Component/LearnerRoutes";

const App = () => {
  // This checks if your Netlify URL starts with your admin site's name
  // e.g., "g-client-admin.netlify.app"
  const isAdmin = window.location.hostname.startsWith("g-client-admin"); // Use your admin site's name

  return (
    <AuthProvider>{isAdmin ? <AdminRoutes /> : <LearnerRoutes />}</AuthProvider>
  );
};

export default App;
