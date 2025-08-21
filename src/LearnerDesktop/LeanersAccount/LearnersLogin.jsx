import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import lo from "../../assets/Leaners/LoginImages/lo1.png";
import { FcGoogle } from "react-icons/fc";
import { FaRegEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../LeanersAccount/AuthContext";

const LearnersLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const apiUrl = "/api/auth/login";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.user, data.token);
        navigate("/learner");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError("An error occurred.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
      <div className="hidden md:block md:w-1/2">
        <img
          src={lo}
          alt="Learners Login"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <h1 className="text-[#404040] font-semibold text-2xl text-center">
          Log in to continue your <br /> learning Journey
        </h1>
        <p className="text-center my-4">or</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="flex flex-col gap-4">
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
          </div>
          <div className="text-right my-2">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* ✅ MOVED BUTTON INSIDE THE FORM */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-primary text-white rounded-md mt-4 disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          <p className="text-center mt-4 text-sm">
            Need to create an Account?{" "}
            <Link
              to="/learners-signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LearnersLogin;
