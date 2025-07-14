import React, { useState } from "react";
import bg from "../../assets/Images/Account/bg.png";
import logo from "../../assets/Images/Account/logo.png";
import AccountButtons from "../Buttons/AccountButtons";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  // const [form, setForm] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    // This function will handle the navigation
    e.preventDefault(); // Prevents the page from reloading on form submission
    navigate("/login"); // Navigates to the login page
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm((prevForm) => ({
  //     ...prevForm,
  //     [name]: value,
  //   }));
  // };

  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   setError(null);

  //   if (form.password !== form.confirmPassword) {
  //     setError("Passwords do not match.");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const response = await fetch("https://api.onec.in/api/v1/user/create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         first_name: form.firstName,
  //         last_name: form.lastName,
  //         email: form.email,
  //         password: form.password,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || "Something went wrong");
  //     }

  //     // Handle successful signup
  //     console.log("Signup successful:", data);
  //     // Redirect the user to the sign-in page on successful signup
  //     navigate("/sign-in");
  //   } catch (error) {
  //     if (error instanceof TypeError && error.message === "Failed to fetch") {
  //       setError(
  //         "Network error. Please check your connection or try again later."
  //       );
  //     } else {
  //       setError(error.message);
  //     }
  //     console.error("Signup failed:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="relative w-full h-screen overflow-hidden">
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

          <form className="space-y-4" onSubmit={handleSignup}>
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
              placeholder="Enter your first name"
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
              placeholder="Enter your last name"
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
              placeholder="Enter your email"
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
              placeholder="Enter your password"
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
              placeholder="Confirm your password"
              className="w-full shadow-lg px-4 py-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <AccountButtons type="submit">sign up</AccountButtons>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
