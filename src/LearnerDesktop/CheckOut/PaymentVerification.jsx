import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom"; // 1. IMPORT useNavigate
import { verifyPayment } from "./enrollmentService";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const PaymentVerification = () => {
  const [status, setStatus] = useState("Verifying your payment...");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate(); // 2. INITIALIZE useNavigate

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const reference = queryParams.get("reference");

    if (reference) {
      const verify = async () => {
        try {
          const response = await verifyPayment(reference);
          if (response.success) {
            setStatus("You have successfully enrolled!");
            setMessage("You will be redirected to the homepage shortly.");

            // 3. ADD AUTOMATIC REDIRECT
            setTimeout(() => {
              navigate("/learner"); // Redirect to the learner homepage
            }, 3000); // Wait 3 seconds
          } else {
            throw new Error(response.message || "Verification failed.");
          }
        } catch (err) {
          setStatus("Payment Verification Failed");
          setMessage(
            err.message || "There was an issue confirming your payment."
          );
          console.error(err);
        }
      };
      verify();
    } else {
      setStatus("Payment Verification Failed");
      setMessage("No payment reference was found.");
    }
  }, [location, navigate]);

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
        to="/learner"
        className="px-6 py-3 bg-primary text-white font-semibold rounded-lg"
      >
        Go to Homepage Now
      </Link>
    </div>
  );
};

export default PaymentVerification;
