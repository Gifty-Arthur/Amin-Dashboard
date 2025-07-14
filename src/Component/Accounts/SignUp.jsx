import React from "react";
import bg from "../../assets/Images/Account/bg.png";
import logo from "../../assets/Images/Account/logo.png";
import AccountButtons from "../Buttons/AccountButtons";

const SignupScreen = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="md:w-[495px] md:h-[832px] w-full bg-white bg-opacity-80 p-8 rounded-md shadow-lg">
          <div className="mb-4 text-center">
            <img
              src={logo}
              alt=""
              className="mx-auto  w-20 h-20 object-contain "
            />
            <h2 className="font-bold text-[28px] font-roboto ">
              Admin Sign Up
            </h2>
            <p className="text-gray-600 text-[18px] ">
              Create Your Account to Manage and Access the Dashboard Worldwide
            </p>
          </div>

          <form className="space-y-4">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              className="w-full  shadow-lg px-4 py-3  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 shadow-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 shadow-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 shadow-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 shadow-lg  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <AccountButtons>Sign up</AccountButtons>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a href="#" className="text-primary hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
