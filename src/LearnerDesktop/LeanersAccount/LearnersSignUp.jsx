import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import lo from "../../assets/Leaners/LoginImages/lo1.png";
import { FaRegEnvelope, FaLock, FaPhone } from "react-icons/fa"; // 1. IMPORT PHONE ICON
import { MdOutlinePerson4 } from "react-icons/md";

const LearnersSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "", // 2. ADD 'contact' TO STATE
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);

    try {
      const apiUrl = "/api/auth/signup/learner";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          contact: formData.contact, // 3. SEND 'contact' TO API
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("verificationEmail", formData.email);
        navigate("/learner-otp");
      } else {
        setError(data.message || "Sign up failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please check your connection.");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
      <div className="hidden md:block md:w-1/2">
        <img
          src={lo}
          alt="Learners Signup"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <h1 className="text-[#404040] font-semibold text-2xl text-center mb-6">
          Sign Up to Get Started
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <MdOutlinePerson4 className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full h-12 bg-[#E6E6E6] rounded-md pl-12 pr-4"
                required
              />
            </div>
            <div className="relative">
              <MdOutlinePerson4 className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full h-12 bg-[#E6E6E6] rounded-md pl-12 pr-4"
                required
              />
            </div>
            <div className="relative">
              <FaRegEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-12 bg-[#E6E6E6] rounded-md pl-12 pr-4"
                required
              />
            </div>
            {/* 4. ADD THE CONTACT NUMBER INPUT FIELD */}
            <div className="relative">
              <FaPhone className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="contact"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
                className="w-full h-12 bg-[#E6E6E6] rounded-md pl-12 pr-4"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-12 bg-[#E6E6E6] rounded-md pl-12 pr-4"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full h-12 bg-[#E6E6E6] rounded-md pl-12 pr-4"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-primary text-white rounded-md mt-4 disabled:opacity-50"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
          <p className="text-center mt-4 text-sm">
            Already Have an Account?{" "}
            <Link
              to="/learner-login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LearnersSignUp;
