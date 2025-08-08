import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { TbFileInvoice } from "react-icons/tb";

const Portal = () => {
  return (
    <div>
      <div className="w-full bg-primary  h-[135px] -mt-10 flex flex-col items-center justify-center">
        <div className="w-[1042px] h-[76px] bg-white mt-15 ">
          <div className="flex items-center gap-2">
            <Link>
              <div className="w-[164px] h-[76px] hover:bg-[#014273] flex items-center justify-center">
                <div className="flex items-center gap-2 font-semibold hover:text-white">
                  <MdOutlineDashboard />
                  <h1>Dashboard</h1>
                </div>
              </div>
            </Link>
            {/* settings */}
            <Link>
              <div className="w-[164px] h-[76px] hover:bg-[#014273] flex items-center justify-center">
                <div className="flex items-center gap-2 font-semibold hover:text-white">
                  <IoSettingsOutline />
                  <h1>Settings</h1>
                </div>
              </div>
            </Link>
            {/* invoice */}
            <Link>
              <div className="w-[164px] h-[76px] hover:bg-[#014273] flex items-center justify-center">
                <div className="flex items-center gap-2 font-semibold hover:text-white">
                  <TbFileInvoice />
                  <h1>Invoice</h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;
