import React, { useState, useEffect } from "react";
import bg from "../../assets/Images/Account/bg.png";
import logo from "../../assets/Images/Account/logo.png";
import AccountButtons from "../Buttons/AccountButtons";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";

const AdminResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const location = useLocation();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tokenFromUrl = token || urlParams.get("token");

    if (tokenFromUrl) {
      setResetToken(tokenFromUrl.trim());
    } else {
      alert("Invalid reset link. Please request a new password reset.");
      navigate("/forgot-password");
    }
  }, [token, location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newPassword) {
      newErrors.password = "New Password is required";
    } else if (newPassword.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        newPassword
      )
    ) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!resetToken) {
      setErrors({
        submit: "Invalid reset token. Please request a new password reset.",
      });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch(`/api/auth/reset-password/${resetToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          password: newPassword,
          confirmPassword: confirmPassword,
        }),
      });

      if (response.ok) {
        alert(
          "Password reset successfully! You can now login with your new password."
        );
        localStorage.removeItem("resetEmail");
        navigate("/login");
      } else {
        const data = await response.json();
        const message =
          data?.errors?.[0]?.message ||
          data?.message ||
          "Reset failed. Try again.";
        setErrors({ submit: message });
      }
    } catch (err) {
      setErrors({ submit: "Network error. Please try again later." });
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
              alt="Logo"
              className="mx-auto w-20 h-20 object-contain"
            />
            <h2 className="font-bold text-[28px]">Reset Password</h2>
            <p className="text-gray-600 text-[18px]">
              Create a new secure password
            </p>
          </div>

          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <div className="font-medium">Error:</div>
              <div>{errors.submit}</div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={newPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your new password"
                disabled={isLoading}
                minLength={8}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm your new password"
                disabled={isLoading}
                minLength={8}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <AccountButtons type="submit" disabled={isLoading || !resetToken}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </AccountButtons>
          </form>

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

export default AdminResetPassword;
