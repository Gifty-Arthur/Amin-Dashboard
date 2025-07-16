// src/components/Sidebar.js
import { FaUsers, FaLayerGroup, FaBook, FaChartBar } from "react-icons/fa";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";

import logo from "../../../assets/Images/Account/logo.png";

const Sidebar = () => {
  return (
    <div className="w-[280px] bg-blue-900 text-white min-h-screen p-5">
      <div className="w-[244px] rounded-[4px] bg-white h-[93px] flex items-center justify-center">
        <img
          src={logo}
          alt="One C Logo"
          className=" w-20 h-20 object-contain"
        />
      </div>
      <ul className="space-y-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-md mt-6 hover:bg-white hover:text-blue-900 ${
              isActive ? "bg-white text-blue-900" : ""
            }`
          }
        >
          <RiDashboardHorizontalLine /> <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/invoices"
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
          to="/tracks"
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
      </ul>

      <div className="absolute bottom-5 left-5">
        <p className="text-sm">Admin 123</p>
        <div className="flex   items-center gap-20 ">
          <p className="text-xs text-gray-300">admin123@gmail.com</p>
          <CiLogout className="text-white cursor-pointer " size={30} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
