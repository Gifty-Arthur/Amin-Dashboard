import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdEmail, MdVerified } from "react-icons/md";

const EmailVerification = ({ isOpen, onClose, onVerificationSuccess }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [step, setStep] = useState("send"); // "send" or "verify"

  // Send verification code to email
  const handleSendVerification = async (e) => {
    e.preventDefault();
    setIsSendingCode(true);
    setError(null);
    setSuccess(null);

    try {
      const token =
        localStorage.getItem("authToken") ||
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("authToken") ||
        sessionStorage.getItem("token");

      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            result.errors?.[0]?.message ||
            "Failed to send verification code"
        );
      }

      setSuccess("Verification code sent to your email!");
      setStep("verify");
    } catch (err) {
      setError("Failed to send verification: " + err.message);
    } finally {
      setIsSendingCode(false);
    }
  };

  // Verify email with code
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const token =
        localStorage.getItem("authToken") ||
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("authToken") ||
        sessionStorage.getItem("token");

      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          email,
          verificationCode: verificationCode,
          code: verificationCode, // Some APIs might expect "code" instead
          token: verificationCode, // Some APIs might expect "token" instead
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.errors?.[0]?.message || "Verification failed"
        );
      }

      setSuccess("Email verified successfully! You can now create tracks.");

      // Call success callback if provided
      if (onVerificationSuccess) {
        onVerificationSuccess();
      }

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError("Verification failed: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          disabled={isSubmitting || isSendingCode}
        >
          <IoClose size={24} />
        </button>

        <div className="text-center mb-6">
          <MdEmail className="mx-auto text-4xl text-blue-500 mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">
            Email Verification
          </h2>
          <p className="text-gray-600 mt-2">
            Verify your email to create tracks
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
            <MdVerified className="mr-2" />
            {success}
          </div>
        )}

        {step === "send" && (
          <form onSubmit={handleSendVerification}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="shadow-lg appearance-auto rounded w-full py-2 px-3 text-gray-700 leading-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSendingCode}
                placeholder="Enter your email address"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 w-full focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSendingCode}
            >
              {isSendingCode ? "Sending..." : "Send Verification Code"}
            </button>
          </form>
        )}

        {step === "verify" && (
          <form onSubmit={handleVerifyEmail}>
            <div className="mb-4">
              <label
                htmlFor="code"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Verification Code
              </label>
              <input
                type="text"
                id="code"
                className="shadow-lg appearance-auto rounded w-full py-2 px-3 text-gray-700 leading-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                disabled={isSubmitting}
                placeholder="Enter 6-digit code from email"
                maxLength={6}
              />
              <p className="text-sm text-gray-500 mt-1">
                Check your email ({email}) for the verification code
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep("send")}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 flex-1 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                disabled={isSubmitting}
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 flex-1 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Verify Email"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>
            Having trouble? Check your spam folder or try resending the code.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
