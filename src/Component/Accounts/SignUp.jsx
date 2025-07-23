import React, { useState } from "react";
import bg from "../../assets/Images/Account/bg.png";
import logo from "../../assets/Images/Account/logo.png";
import AccountButtons from "../Buttons/AccountButtons";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

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
    // Clear success message when user starts typing again
    setSuccessMessage("");
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.contact)) {
      newErrors.contact = "Please enter a valid contact number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({}); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages

    try {
      console.log("Sending signup request with data:", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        // Note: contact and confirmPassword are sent, but password and confirmPassword
        // are typically handled by backend validation for security.
      });

      // Using Vite proxy - requests to /api/* will be forwarded to the Azure API
      const apiUrl = "/api/auth/signup/admin"; // This is the correct endpoint

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors", // Ensure CORS is handled correctly by your proxy/backend
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          contact: formData.contact,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

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
        // Success - inform user to check email
        console.log("Sign up successful:", data);
        setSuccessMessage(
          "Account created successfully! Please check your email to verify your account before logging in."
        );
        // Store email for OTP verification in localStorage
        // Using 'verificationEmail' to distinguish from 'resetEmail' used in OTP component
        localStorage.setItem("verificationEmail", formData.email);

        // Optionally, reset form fields after successful signup
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          contact: "",
          password: "",
          confirmPassword: "",
        });

        // Redirect to OTP page after a short delay to allow user to read message
        setTimeout(() => {
          navigate("/otp");
        }, 3000); // Redirect after 3 seconds
      } else {
        // Handle API errors - show detailed error for debugging
        console.error("API Error:", data);
        console.error("Full error details:", JSON.stringify(data, null, 2));

        let errorMessage = "Sign up failed. ";

        if (data.message) {
          errorMessage += data.message;
        } else if (data.error) {
          errorMessage += data.error;
        } else if (data.errors && Array.isArray(data.errors)) {
          console.log("Validation errors:", data.errors);
          errorMessage += "Validation errors: " + data.errors.join(", ");
        } else if (data.errors && typeof data.errors === "object") {
          console.log("Validation errors object:", data.errors);
          errorMessage +=
            "Validation errors: " + Object.values(data.errors).join(", ");
        } else {
          errorMessage += `Status: ${response.status}`;
        }

        setErrors({
          submit: errorMessage,
        });
      }
    } catch (error) {
      console.error("Sign up error details:", error);

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
            <h2 className="font-bold text-[28px] font-roboto">Admin Sign Up</h2>
            <p className="text-gray-600 text-[18px]">
              Create Your Account to Manage and Access the Dashboard Worldwide
            </p>
          </div>

          {/* Display general error message */}
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.submit}
            </div>
          )}

          {/* Display success message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Number
              </label>
              <input
                id="contact"
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="e.g., +1234567890"
                className={`w-full shadow-lg px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.contact ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.contact && (
                <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full shadow-lg px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full shadow-lg px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>

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
                placeholder="Must include uppercase, lowercase, number, and special character"
                className={`w-full shadow-lg px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Password must contain: uppercase letter, lowercase letter,
                number, and special character (@$!%*?&)
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full shadow-lg px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <AccountButtons
              type="submit" // Correctly set to submit
              disabled={isLoading}
              // Removed redundant onClick={handleSubmit} as type="submit" on button inside form handles it
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </AccountButtons>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
