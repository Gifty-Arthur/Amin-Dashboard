import React, { useState } from "react";
import bg from "../../assets/Images/Account/bg.png";
import logo from "../../assets/Images/Account/logo.png";
import AccountButtons from "../Buttons/AccountButtons";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
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
      console.log("Sending login request with data:", {
        email: formData.email,
      });

      // Using Vite proxy - requests to /api/* will be forwarded to the Azure API
      const apiUrl = "/api/auth/login";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
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
        // Success - store token if provided and redirect to dashboard
        console.log("Login successful:", data);

        // Store authentication token if provided
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }

        alert("Login successful!");
        navigate("/"); // or navigate to dashboard
      } else {
        // Handle API errors
        console.error("API Error:", data);

        let errorMessage = "Login failed. ";
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
      console.error("Login error details:", error);

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        setErrors({
          submit:
            "Unable to connect to the server. Please check if the API is running and try again.",
        });
      } else if (error.name === "AbortError") {
        setErrors({
          submit: "Request timed out. Please try again.",
        });
      } else {
        setErrors({
          submit: `Network error: ${error.message}. Please check your connection and try again.`,
        });
      }
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
            <h2 className="font-bold text-[28px] font-roboto">Admin Login</h2>
            <p className="text-gray-600 text-[18px]">
              Login to Manage and Access the Dashboard Effortlessly.
            </p>
          </div>

          {/* Display general error message */}
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.submit}
            </div>
          )}

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
                className={`w-full shadow-lg px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full shadow-lg px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="mb-2">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <AccountButtons
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Logging in..." : "Login"}
            </AccountButtons>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
