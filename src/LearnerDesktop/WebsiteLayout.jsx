// src/Component/WebsiteLayout.jsx
import Footer from "./LearnerHomePage/Footer";
import Navbar from "./LearnerHomePage/Navbar";
const WebsiteLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="p-4"> {children}</main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
