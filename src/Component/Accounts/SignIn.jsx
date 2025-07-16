import React from "react";
import bg from "../../assets/Images/Account/bg.png";
import logo from "../../assets/Images/Account/logo.png";
import AccountButtons from "../Buttons/AccountButtons";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div>
      <div>
        <img
          src={bg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="md:w-[495px] w-full bg-white bg-opacity-80 p-8 rounded-md shadow-lg">
            <div className="mb-4 text-center">
              <img
                src={logo}
                alt="One C Logo"
                className="mx-auto w-20 h-20 object-contain"
              />
              <h2 className="font-bold text-[28px] font-roboto">Admin Login</h2>
              <p className="text-gray-600 text-[18px]">
                Login to Manage and Access the Dashboard Effortlessly.{" "}
              </p>
            </div>
            <form className="space-y-4">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="w-full shadow-lg px-4 py-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="w-full shadow-lg px-4 py-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="mb-2">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </form>

            <AccountButtons onClick={() => navigate("/")}>Login</AccountButtons>

            <p className="mt-6 text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link to="/" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
