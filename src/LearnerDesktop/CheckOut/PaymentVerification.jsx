import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentVerification = () => {
  const [status, setStatus] = useState("Verifying payment...");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const reference = queryParams.get("reference");

    if (reference) {
      // Here you would make an API call to your backend
      // to verify the payment with the 'reference'
      console.log("Verifying payment with reference:", reference);
      // setStatus("Payment successful!");
    } else {
      setStatus("Payment verification failed.");
    }
  }, [location]);

  return (
    <div className="text-center p-20">
      <h1 className="text-2xl font-bold">{status}</h1>
    </div>
  );
};

export default PaymentVerification;
