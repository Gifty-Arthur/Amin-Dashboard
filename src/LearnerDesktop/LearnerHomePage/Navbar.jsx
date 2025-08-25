import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/Account/logo.png";
import { FaChevronDown } from "react-icons/fa";
import { useAuth } from "../LeanersAccount/AuthContext";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // 2. GET user and logout from context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // This will run whenever the user logs in or out,
    // ensuring the dropdown is closed by default.
    setIsDropdownOpen(false);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/learner-login");
  };

  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4 px-8 md:px-20">
      {/* Logo and navigation links */}
      <div className="flex items-center gap-10">
        <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
        <ul className="flex gap-4">
          <Link to="/" className="font-semibold hover:text-primary">
            Home
          </Link>
          <Link
            to="/learner-tracks"
            className="font-semibold hover:text-primary"
          >
            Tracks
          </Link>
        </ul>
      </div>

      <div className="flex items-center gap-6">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 font-semibold"
            >
              {user.firstName} {user.lastName}
              <FaChevronDown size={20} className="text-primary mt-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/portal"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b hover:text-primary"
                >
                  Portal
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // If user is not logged in, show Login and Signup buttons
          <>
            <button
              onClick={() => navigate("/learner-login")}
              className="px-8 py-2 text-primary border-2 font-bold border-primary hover:bg-blue-50 rounded-md"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/learners-signup")}
              className="px-8 py-2 font-bold text-white bg-primary hover:opacity-90 rounded-md"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
