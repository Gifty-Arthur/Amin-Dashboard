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
 * Fetches the enrollments for the currently logged-in learner.
 */
export const getMyEnrollments = async () => {
  const config = getAuthConfig();
  const response = await axios.get("/api/enrollments", config);
  return response.data.enrollments || response.data;
};

/**
 * Creates a new enrollment for the logged-in learner.
 */
export const createEnrollment = async (enrollmentData) => {
  const config = getAuthConfig();
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

/**
 * Fetches all enrollments for a specific learner by their ID (for Admin use).
 */
export const getEnrollmentsByLearnerId = async (learnerId) => {
  const adminToken = localStorage.getItem("token");
  if (!adminToken) {
    throw new Error("Admin token not found.");
  }
  const config = { headers: { Authorization: `Bearer ${adminToken}` } };
  const response = await axios.get(
    `/api/enrollments/learner/${learnerId}`,
    config
  );
  return response.data.enrollments || response.data;
};

/**
 * ✅ ADDED THIS FUNCTION
 * Updates the logged-in learner's profile.
 */
export const updateProfile = async (profileData) => {
  const config = getAuthConfig(); // Uses the learner's token
  const response = await axios.put("/api/auth/update", profileData, config);
  return response.data;
};
