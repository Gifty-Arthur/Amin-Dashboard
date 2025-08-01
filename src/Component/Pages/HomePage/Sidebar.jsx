import React, { useState, useEffect } from "react";
import { FaUsers, FaLayerGroup, FaBook } from "react-icons/fa";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import logo from "../../../assets/Images/Account/logo.png";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getInitials = (user) => {
    if (!user) return "";
    const firstNameInitial = user.firstName?.[0] || "";
    const lastNameInitial = user.lastName?.[0] || "";
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  };

  return (
    <div className="w-[280px] bg-blue-900 text-white h-screen p-5 flex flex-col fixed top-0 left-0 overflow-y-auto">
      {/* Top Section */}
      <div>
        <div className="w-[244px] rounded-[4px] bg-white h-[93px] flex items-center justify-center">
          <img
            src={logo}
            alt="One C Logo"
            className="w-20 h-20 object-contain"
          />
        </div>
        <ul className="space-y-6 mt-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-md hover:bg-white hover:text-blue-900 ${
                isActive ? "bg-white text-blue-900" : ""
              }`
            }
          >
            <RiDashboardHorizontalLine /> <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/invoice"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-md hover:bg-white hover:text-blue-900 ${
                isActive ? "bg-white text-blue-900" : ""
              }`
            }
          >
            <LiaFileInvoiceSolid /> <span>Invoices</span>
          </NavLink>
          <NavLink
            to="/learners"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-md hover:bg-white hover:text-blue-900 ${
                isActive ? "bg-white text-blue-900" : ""
              }`
            }
          >
            <FaUsers /> <span>Learners</span>
          </NavLink>
          <NavLink
            to="/track"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-md hover:bg-white hover:text-blue-900 ${
                isActive ? "bg-white text-blue-900" : ""
              }`
            }
          >
            <FaLayerGroup /> <span>Tracks</span>
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-md hover:bg-white hover:text-blue-900 ${
                isActive ? "bg-white text-blue-900" : ""
              }`
            }
          >
            <FaBook /> <span>Courses</span>
          </NavLink>
          <NavLink
            to="/report"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-md hover:bg-white hover:text-blue-900 ${
                isActive ? "bg-white text-blue-900" : ""
              }`
            }
          >
            <FaBook /> <span>Report</span>
          </NavLink>
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto">
        {user ? (
          <div className="flex items-center gap-3">
            {user.image ? (
              <img
                src={user.image}
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                {getInitials(user)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{`${user.firstName} ${user.lastName}`}</p>
              <p className="text-xs text-gray-300 truncate">{user.email}</p>
            </div>
            <button onClick={handleLogout} title="Logout">
              <CiLogout
                className="text-white cursor-pointer hover:text-red-400 transition-colors"
                size={24}
              />
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-400">Loading user...</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
