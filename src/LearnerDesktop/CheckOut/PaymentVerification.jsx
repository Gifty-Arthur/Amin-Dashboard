import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { verifyPayment } from "./enrollmentService";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const PaymentVerification = () => {
  const [status, setStatus] = useState("Verifying your payment...");
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false); // 1. ADD a state to track verification
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 2. PREVENT the effect from running again if already verified
    if (isVerified) return;

    const queryParams = new URLSearchParams(location.search);
    const reference = queryParams.get("reference");

    if (reference) {
      const verify = async () => {
        try {
          const response = await verifyPayment(reference);
          if (response.success) {
            setStatus("You have successfully enrolled!");
            setMessage("You will be redirected to your portal shortly.");

            setTimeout(() => {
              navigate("/portal"); // Navigate to the portal
            }, 5000);
          } else {
            throw new Error(response.message || "Verification failed.");
          }
        } catch (err) {
          setStatus("Payment Verification Failed");
          setMessage(
            err.message || "There was an issue confirming your payment."
          );
          console.error(err);
        } finally {
          // 3. MARK verification as complete
          setIsVerified(true);
        }
      };
      verify();
    } else {
      setStatus("Payment Verification Failed");
      setMessage("No payment reference was found.");
      setIsVerified(true);
    }
  }, [location, navigate, isVerified]); // 4. ADD isVerified to dependency array

  return (
    <div className="text-center p-10 md:p-20 flex flex-col items-center">
      {status.includes("Successfully") && (
        <FaCheckCircle className="text-green-500 text-6xl mb-4" />
      )}
      {status.includes("Failed") && (
        <FaTimesCircle className="text-red-500 text-6xl mb-4" />
      )}
      <h1 className="text-3xl font-bold mb-4">{status}</h1>
      <p className="text-gray-600 mb-8">{message}</p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-white font-semibold rounded-lg"
      >
        Go to Homepage Now
      </Link>
    </div>
  );
};

export default PaymentVerification;
