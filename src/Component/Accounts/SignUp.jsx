import React from "react";
import bg from "../../assets/Images/Account/bg.png";
import logo from "../../assets/Images/Account/logo.png";

const SignupScreen = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <img
        src={bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay container to center the form */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md bg-white bg-opacity-80 p-8 rounded-md shadow-lg">
          <div className="mb-6 text-center">
            <img src={logo} alt="" className="text-center" />
            <p className="text-gray-600 text-sm">
              Create Your Account to Manage and Access the Dashboard Worldwide
            </p>
          </div>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign up
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
