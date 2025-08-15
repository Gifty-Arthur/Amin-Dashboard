// src/Component/WebsiteLayout.jsx
import { Outlet } from "react-router";
import Footer from "./LearnerHomePage/Footer";
import Navbar from "./LearnerHomePage/Navbar";
const WebsiteLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        {" "}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
