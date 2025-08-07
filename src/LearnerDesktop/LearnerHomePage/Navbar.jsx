import React from "react";
import logo from "../../assets/Images/Account/logo.png";
import { Link } from "react-router";
import { CiInboxIn, CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between bg-white shadow-2xl p-4 px-20">
        <div className="flex flex-row gap-10 ">
          <img
            src={logo}
            alt="One C Logo"
            className=" w-20 h-20 object-contain"
          />{" "}
          <div className="">
            <ul className="flex flex-row gap-4 pt-7">
              <Link
                to=""
                className="font-figtree text-black  hover:text-blue-400
              "
              >
                Home
              </Link>
              <Link
                to=""
                className="font-figtree text-black  hover:text-blue-400
              "
              >
                Courses
              </Link>
            </ul>
          </div>
        </div>
        {/* login */}

        <div className="gap-6 flex">
          <button
            onClick={() => navigate("/learner-login")}
            className="w-[125px] h-[48px] text-primary border-2 font-bold border-primary hover:bg-[#E6EFF5] cursor-pointer rounded-md"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/learners-signup")}
            className="w-[139px] h-[48px]  font-bold text-white border-1 bg-primary border-primary hover:bg-[#E6EFF5] cursor-pointer hover:text-primary"
          >
            <div className="flex  gap-1 ml-8">
              Signup
              <CiLogout size={24} className="mt-0.5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
