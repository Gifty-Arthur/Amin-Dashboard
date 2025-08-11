import axios from "axios";

const API_BASE_URL = "/api/enrollments";

const getToken = () => localStorage.getItem("learnerToken");

const getAuthConfig = () => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication token not found. Please log in.");
  }
  return { headers: { Authorization: `Bearer ${token}` } };
};

/**
 * Creates a new enrollment for the logged-in learner.
 * @param {object} enrollmentData - An object containing the trackId.
 */
export const createEnrollment = async (enrollmentData) => {
  const config = getAuthConfig();
  const response = await axios.post(API_BASE_URL, enrollmentData, config);
  return response.data;
};
