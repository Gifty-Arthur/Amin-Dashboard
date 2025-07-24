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
  const [resendMessage, setResendMessage] = useState("");
  const [verificationEmail, setVerificationEmail] = useState("");

  useEffect(() => {
    const emailFromStorage = localStorage.getItem("verificationEmail");
    if (emailFromStorage) {
      setVerificationEmail(emailFromStorage);
    } else {
      console.warn("No verification email found in localStorage.");
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    if (errors.otp) {
      setErrors({ ...errors, otp: "" });
    }
    setIsSuccess(false);
    setResendMessage("");
  };

  const validateOtp = () => {
    const newErrors = {};
    if (!otp.trim() || otp.length !== 6) {
      newErrors.otp = "OTP must be 6 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateOtp()) return;

    if (!verificationEmail) {
      setErrors({ otp: "Email not found. Please try signing up again." });
      return;
    }

    setIsLoading(true);
    setErrors({});
    setIsSuccess(false);
    setResendMessage("");

    try {
      const apiUrl = "/api/auth/verify-email";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: verificationEmail,
          token: otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        localStorage.removeItem("verificationEmail");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setErrors({ otp: data.message || "Failed to verify OTP." });
      }
    } catch (error) {
      setErrors({ otp: "An error occurred. Please check your connection." });
      console.error("Error verifying OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    const email = localStorage.getItem("verificationEmail");
    if (!email) {
      setErrors({ otp: "No email found to resend OTP." });
      return;
    }

    setIsLoading(true);
    setErrors({});
    setIsSuccess(false);
    setResendMessage("");

    try {
      const apiUrl = "/api/auth/resend-token";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setResendMessage("New OTP sent! Please check your email.");
      } else {
        setErrors({ otp: data.message || "Failed to resend OTP." });
      }
    } catch (error) {
      setErrors({ otp: "An error occurred. Please check your connection." });
      console.error("Error resending OTP:", error);
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
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="md:w-[495px] w-full bg-white bg-opacity-80 p-8 rounded-md shadow-lg">
          <div className="mb-4 text-center">
            <img
              src={logo}
              alt="One C Logo"
              className="mx-auto w-20 h-20 object-contain"
            />
            <h2 className="font-bold text-3xl font-roboto">
              Admin Account Verification
            </h2>
            <p className="text-gray-600 text-lg">
              Enter the OTP sent to your email
            </p>
          </div>

          {errors.otp && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.otp}
            </div>
          )}
          {isSuccess && !errors.otp && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              OTP verified successfully! Redirecting to login...
            </div>
          )}
          {resendMessage && (
            <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
              {resendMessage}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="otp" className="sr-only">
                Code
              </label>
              <input
                id="otp"
                type="text"
                name="otp"
                value={otp}
                onChange={handleChange}
                placeholder="123456"
                className="w-full text-center text-2xl tracking-[.5em] shadow-lg px-4 mb-4 py-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                maxLength={6}
              />
            </div>
            <AccountButtons type="submit" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify"}
            </AccountButtons>
          </form>

          {/* ✅ CORRECTED: Changed <Link> to <button> for the resend action */}
          <p className="mt-6 text-center text-gray-600 text-sm">
            Didn't receive the OTP?{" "}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isLoading}
              className="font-medium text-primary hover:underline disabled:text-gray-400"
            >
              Resend OTP
            </button>
          </p>

          <p className="mt-4 text-center text-gray-600 text-sm">
            Back to{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTP;
