import React, { useState, useEffect } from "react";
import bg from "../../assets/Images/Account/bg.png";
import logo from "../../assets/Images/Account/logo.png";
import AccountButtons from "../Buttons/AccountButtons";
import { useNavigate, Link } from "react-router-dom";

const OTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      alert("No email found. Please request a new OTP.");
      navigate("/forgot-password"); // Redirect to the forgot password page
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setOtp(e.target.value);
    // Clear error when user starts typing
    if (errors.otp) {
      setErrors({ ...errors, otp: "" });
    }
  };

  // Validate OTP
  const validateOtp = () => {
    const newErrors = {};
    if (!otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (otp.length !== 4) {
      newErrors.otp = "OTP must be 4 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle OTP verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateOtp()) {
      return;
    }

    setIsLoading(true);
    try {
      const email = localStorage.getItem("resetEmail"); // Get the email from localStorage
      const apiUrl =
        "https://tmp-se-projectapi.azurewebsites.net/api/auth/verify-email";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        alert(
          "OTP verified successfully! Please proceed to reset your password."
        );
        navigate("/reset-password"); // Redirect to reset password page
      } else {
        setErrors({ otp: data.message || "Failed to verify OTP." });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrors({
        otp: "An error occurred while verifying OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    const email = localStorage.getItem("resetEmail"); // Get the email from localStorage
    const apiUrl =
      "https://tmp-se-projectapi.azurewebsites.net/api/auth/resend-token";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("OTP resent successfully. Please check your email.");
      } else {
        alert("Failed to resend OTP.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("An error occurred while resending OTP. Please try again.");
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
              Admin Reset Password
            </h2>
            <p className="text-gray-600 text-[18px]">
              Enter the OTP sent to your email
            </p>
          </div>

          {/* Display error message */}
          {errors.otp && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.otp}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="otp"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Code
              </label>
              <input
                id="otp"
                type="number"
                name="otp"
                value={otp}
                onChange={handleChange}
                placeholder="1234"
                className="w-full shadow-lg px-4 mb-4 py-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <AccountButtons type="submit" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify"}
            </AccountButtons>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Didn't receive the OTP?{" "}
            <Link
              to="#"
              onClick={handleResendOtp}
              className="text-primary hover:underline"
            >
              Resend OTP
            </Link>
          </p>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Back to{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTP;
