import React, { useState } from "react";
import bg from "../../assets/Images/Account/bg.png";
import logo from "../../assets/Images/Account/logo.png";
import AccountButtons from "../Buttons/AccountButtons";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      console.log("Sending forgot password request with data:", {
        email: formData.email,
      });

      const apiUrl = "/api/auth/forgot-password";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      console.log("Response status:", response.status);

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
        console.log("Response data:", data);
      } else {
        const textResponse = await response.text();
        console.log("Non-JSON response:", textResponse);
        data = { message: textResponse };
      }

      if (response.ok) {
        console.log("Forgot password request successful:", data);
        setIsSuccess(true);
        localStorage.setItem("resetEmail", formData.email);
      } else {
        console.error("API Error:", data);
        let errorMessage = "Failed to send reset email. ";
        if (data.message) {
          errorMessage += data.message;
        } else if (data.error) {
          errorMessage += data.error;
        } else {
          errorMessage += `Status: ${response.status}`;
        }
        setErrors({
          submit: errorMessage,
        });
      }
    } catch (error) {
      console.error("Forgot password error details:", error);
      setErrors({
        submit: `Network error: ${error.message}. Please check your connection and try again.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            <h2 className="font-bold text-[28px] font-roboto">
              Forgot Password
            </h2>
            <p className="text-gray-600 text-[18px]">
              {isSuccess
                ? "Reset link sent! Check your inbox."
                : "Enter your email to reset your password"}
            </p>
          </div>

          {isSuccess && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              Password reset link has been sent to {formData.email}. Please
              check your inbox and click the reset link to continue.
            </div>
          )}

          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.submit}
            </div>
          )}

          {!isSuccess && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your registered email address"
                  className={`w-full shadow-lg px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <AccountButtons type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </AccountButtons>
            </form>
          )}

          {isSuccess && (
            <div className="mt-4 text-center">
              <Link to="/" className="text-primary hover:underline">
                Back to Login
              </Link>
            </div>
          )}

          <p className="mt-6 text-center text-gray-600 text-sm">
            Back to{" "}
            <Link to="/" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
