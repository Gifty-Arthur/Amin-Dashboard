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
  const [isSuccess, setIsSuccess] = useState(false); // Used for success message display
  const [resendMessage, setResendMessage] = useState(""); // New state for resend message

  useEffect(() => {
    // Retrieve the email stored by the SignUp component
    const email = localStorage.getItem("verificationEmail");
    if (!email) {
      // If no email is found, it means the user didn't come from signup or reset flow correctly.
      // You might want to show a more user-friendly message or redirect.
      console.warn(
        "No verification email found in localStorage for OTP verification. Redirecting to signup."
      );
      // Optionally, navigate them back to signup if this OTP page is strictly for signup verification
      // navigate("/signup");
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setOtp(e.target.value);
    // Clear error when user starts typing
    if (errors.otp) {
      setErrors({ ...errors, otp: "" });
    }
    setIsSuccess(false); // Clear success message on new input
    setResendMessage(""); // Clear resend message on new input
  };

  // Validate OTP
  const validateOtp = () => {
    const newErrors = {};
    if (!otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (otp.length !== 4) {
      // Assuming OTP is always 4 digits
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
    setErrors({}); // Clear previous errors
    setIsSuccess(false); // Clear previous success state
    setResendMessage(""); // Clear resend message

    try {
      // For email verification after signup, the backend might only need the token.
      // Based on your input: `{"token": "144234"}`, it only needs the token.
      const apiUrl =
        "https://tmp-se-projectapi.azurewebsites.net/api/auth/verify-email";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          token: otp, // Send OTP under the 'token' key as per backend expectation
        }),
      });

      const data = await response.json();
      console.log("OTP verification response:", data);

      if (response.ok) {
        setIsSuccess(true);
        console.log("OTP verified successfully!");
        // Clear the verification email from localStorage after successful verification
        localStorage.removeItem("verificationEmail");

        // Redirect to the login page after successful verification
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect after 2 seconds
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
    // Retrieve the email stored by the SignUp component
    const email = localStorage.getItem("verificationEmail");
    if (!email) {
      setErrors({
        otp: "No email found to resend OTP. Please go back to signup.",
      });
      return;
    }

    const apiUrl =
      "https://tmp-se-projectapi.azurewebsites.net/api/auth/resend-token";
    setIsLoading(true); // Indicate loading for resend
    setErrors({}); // Clear errors before resending
    setIsSuccess(false); // Clear success message
    setResendMessage(""); // Clear previous resend message

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send the email to resend token
      });

      if (response.ok) {
        console.log("OTP resent successfully.");
        setResendMessage("New OTP sent! Please check your email."); // Display success message for resend
      } else {
        const errorData = await response.json();
        setErrors({ otp: errorData.message || "Failed to resend OTP." });
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setErrors({
        otp: "An error occurred while resending OTP. Please try again.",
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
              Admin Account Verification
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

          {/* Display success message after verification */}
          {isSuccess && !errors.otp && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              OTP verified successfully! Redirecting to login...
            </div>
          )}

          {/* Display resend message */}
          {resendMessage && (
            <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
              {resendMessage}
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
