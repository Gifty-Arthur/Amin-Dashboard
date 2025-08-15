import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom"; // 1. IMPORT NavLink and Outlet
import { IoSettingsOutline } from "react-icons/io5";
import { TbFileInvoice } from "react-icons/tb";

const Portal = () => {
  const activeLinkStyle = "bg-[#014273] text-white";
  const inactiveLinkStyle = "hover:bg-blue-50";

  return (
    <div>
      <div className="w-full bg-primary h-[135px] flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl bg-white rounded-t-lg">
          <div className="flex items-center">
            {/* 2. USE NavLink for automatic active styling */}
            <NavLink
              to="/portal"
              end // 'end' prop ensures it's only active for the exact path
              className={({ isActive }) =>
                `w-[164px] h-[76px] flex items-center justify-center ${
                  isActive ? activeLinkStyle : inactiveLinkStyle
                }`
              }
            >
              <div className="flex items-center gap-2 font-semibold">
                <MdOutlineDashboard />
                <h1>Dashboard</h1>
              </div>
            </NavLink>

            <NavLink
              to="/portal/settings"
              className={({ isActive }) =>
                `w-[164px] h-[76px] flex items-center justify-center ${
                  isActive ? activeLinkStyle : inactiveLinkStyle
                }`
              }
            >
              <div className="flex items-center gap-2 font-semibold">
                <IoSettingsOutline />
                <h1>Settings</h1>
              </div>
            </NavLink>

            <NavLink
              to="/portal/invoices"
              className={({ isActive }) =>
                `w-[164px] h-[76px] flex items-center justify-center ${
                  isActive ? activeLinkStyle : inactiveLinkStyle
                }`
              }
            >
              <div className="flex items-center gap-2 font-semibold">
                <TbFileInvoice />
                <h1>Invoice</h1>
              </div>
            </NavLink>
          </div>
        </div>
      </div>

      {/* 3. RENDER THE CHILD ROUTE CONTENT HERE */}
      <div className="max-w-5xl mx-auto p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Portal;
