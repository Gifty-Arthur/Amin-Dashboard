import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import lo from "../../assets/Leaners/LoginImages/lo1.png";

const LearnsOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("verificationEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email, they can't verify. Redirect them.
      navigate("/learner-signup");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }
    setIsLoading(true);

    try {
      const apiUrl = "/api/auth/verify-email";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token: otp }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("verificationEmail");
        alert("Verification successful! Please log in.");
        navigate("/learner-login");
      } else {
        setError(data.message || "Verification failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("OTP error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 md:p-8 min-h-screen">
      <div className="hidden md:block md:w-1/2">
        <img
          src={lo}
          alt="OTP Verification"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <h1 className="text-[#404040] font-semibold text-2xl text-center">
          OTP Verification
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Enter the 6-digit code sent to{" "}
          <span className="font-bold">{email}</span>
        </p>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-sm mt-8">
          <input
            id="otp"
            type="text"
            name="otp"
            value={otp}
            onChange={handleChange}
            placeholder="123456"
            className="w-full text-center text-2xl tracking-[.5em] shadow-lg px-4 py-3 border rounded-md"
            required
            maxLength={6}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-primary text-white rounded-md mt-6 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LearnsOTP;
