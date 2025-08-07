import React from "react";
import lo from "../../assets/Leaners/LoginImages/lo1.png";
import { FcGoogle } from "react-icons/fc";
import { FaRegEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
// // 1. Import your icons

const LearnersLogin = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-15 ">
        <img src={lo} alt="Learners Login" className="object-cover" />
        <div>
          <h1 className="text-[#404040] font-semibold text-2xl text-center ">
            Log in to continue your
            <br /> learning Journey
          </h1>
          <button className="w-[436px] h-[48px] border-2 border-primary rounded-md mt-8">
            <div className="flex items-center justify-center gap-2">
              <FcGoogle size={24} />
              <p className="text-md text-primary font-semibold">
                Log in using Google
              </p>
            </div>
          </button>
          <p className="text-center mt-2">or</p>
          <form>
            <div className="flex flex-col gap-4 mt-4">
              <div className="relative">
                <FaRegEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-[436px] h-[48px] bg-[#E6E6E6] rounded-md pl-12 pr-4" // Added more left padding
                />
              </div>
              <div className="relative">
                <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-[436px] h-[48px]  bg-[#E6E6E6] rounded-md pl-12 pr-4" // Added more left padding
                />
              </div>
            </div>
            <div className="mb-2 mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
          <button className="w-[436px] h-[48px] bg-primary text-white rounded-md mt-4">
            Log In
          </button>
          <p className="text-center mt-4 text-sm underlinej ">
            Need to create an Account?{" "}
            <Link to="/learner-signup" className="text-primary font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearnersLogin;
