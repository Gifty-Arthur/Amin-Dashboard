import axios from "axios";

// Helper function to get the token from localStorage
const getToken = () => localStorage.getItem("token");

const getAuthConfig = () => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Assumes your API endpoint for learners is /api/learners
const API_BASE_URL = "/api/learners";

/**
 * Fetches all learners from the API.
 */
export const getAllLearners = async () => {
  const config = getAuthConfig();
  const response = await axios.get(API_BASE_URL, config);
  return response.data.learners || response.data;
};
