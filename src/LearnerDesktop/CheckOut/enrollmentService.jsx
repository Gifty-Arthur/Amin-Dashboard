import axios from "axios";

const getToken = () => localStorage.getItem("learnerToken");

const getAuthConfig = () => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  return { headers: { Authorization: `Bearer ${token}` } };
};

/**
 * Fetches the enrollments (registrations) for the currently logged-in learner.
 */
export const getMyEnrollments = async () => {
  const config = getAuthConfig();
  // Note: This uses /api/registrations to GET the list
  const response = await axios.get("/api/registrations", config);
  return response.data.registrations || response.data;
};

/**
 * Creates a new enrollment for the logged-in learner.
 */
export const createEnrollment = async (enrollmentData) => {
  const config = getAuthConfig();
  // Note: This uses /api/enrollments to CREATE a new one
  const response = await axios.post("/api/enrollments", enrollmentData, config);
  return response.data;
};

/**
 * Verifies a Paystack payment with the backend.
 */
export const verifyPayment = async (reference) => {
  const config = getAuthConfig();
  const response = await axios.post(
    "/api/enrollments/verify-payment",
    { reference },
    config
  );
  return response.data;
};
