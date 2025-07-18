import { Route, Routes } from "react-router-dom";
import SignUp from "./Component/Accounts/SignUp";
import SignIn from "./Component/Accounts/SignIn";
import Home from "./Component/Pages/HomePage/Home";
import Invoices from "./Component/Pages/Invoices";
import DashboardLayout from "./Component/Pages/DashboardLayout ";
import Learners from "./Component/Pages/Learners";
import Courses from "./Component/Pages/Courses";
import Track from "./Component/Pages/Track";
import ResetPassword from "./Component/Accounts/ResetPassword";
import OTP from "./Component/Accounts/OTP";

function App() {
  return (
    <Routes>
      {/* Auth pages - without sidebar */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/forgot-password" element={<ResetPassword />} />
      <Route path="/otp" element={<OTP />} />

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
    </Routes>
  );
}

export default App;
