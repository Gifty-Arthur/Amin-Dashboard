import React from "react";
import { AuthProvider } from "./LearnerDesktop/LeanersAccount/AuthContext";
import { AdminRoutes } from "./Component/AdminRoutes";
import { LearnerRoutes } from "./Component/LearnerRoutes";

const App = () => {
  const isAdmin = window.location.hostname.startsWith("g-client-admin");

  return (
    <AuthProvider>{isAdmin ? <AdminRoutes /> : <LearnerRoutes />}</AuthProvider>
  );
};

export default App;
