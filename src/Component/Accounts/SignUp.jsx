import React from "react";
import bg from "../../assets/Images/Account/bg.png";
import logo from "../../assets/Images/Account/logo.png";
import AccountButtons from "../Buttons/AccountButtons";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  return (
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
            <h2 className="font-bold text-[28px] font-roboto">Admin Sign Up</h2>
            <p className="text-gray-600 text-[18px]">
              Create Your Account to Manage and Access the Dashboard Worldwide
            </p>
          </div>
          <form className="space-y-4">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              className="w-full shadow-lg px-4 py-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              className="w-full shadow-lg px-4 py-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

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

            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="w-full shadow-lg px-4 py-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </form>
          <AccountButtons onClick={() => navigate("/login")}>
            Sign up
          </AccountButtons>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-primary hover:underline">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

// import React, { useState } from "react";
// import bg from "../../assets/Images/Account/bg.png";
// import logo from "../../assets/Images/Account/logo.png";
// import AccountButtons from "../Buttons/AccountButtons";
// import { useNavigate, Link } from "react-router-dom";

// const SignUp = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       <img
//         src={bg}
//         alt="Background"
//         className="absolute inset-0 w-full h-full object-cover"
//       />

//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="md:w-[495px] w-full bg-white bg-opacity-80 p-8 rounded-md shadow-lg">
//           <div className="mb-4 text-center">
//             <img
//               src={logo}
//               alt="One C Logo"
//               className="mx-auto w-20 h-20 object-contain"
//             />
//             <h2 className="font-bold text-[28px] font-roboto">Admin Sign Up</h2>
//             <p className="text-gray-600 text-[18px]">
//               Create Your Account to Manage and Access the Dashboard Worldwide
//             </p>
//           </div>

//           <form className="space-y-4" onSubmit={handleSignup}>
//             <label
//               htmlFor="firstName"
//               className="text-sm font-medium text-gray-700"
//             >
//               First Name
//             </label>
//             <input
//               id="firstName"
//               type="text"
//               name="firstName"
//               className="w-full shadow-lg px-4 py-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />

//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
