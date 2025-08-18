import axios from "axios";

// Helper function to get the correct token
const getToken = () => localStorage.getItem("token"); // For Admin actions

const getAuthConfig = () => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  return { headers: { Authorization: `Bearer ${token}` } };
};

const API_BASE_URL = "/api/learners";

/**
 * Fetches all learners from the API.
 */
export const getAllLearners = async () => {
  const config = getAuthConfig();
  const response = await axios.get(API_BASE_URL, config);
  // ✅ CORRECTED: Look for the 'learners' array in the response
  return response.data.learners || [];
};

/**
 * Fetches a single learner by their ID.
 */
export const getLearnerById = async (learnerId) => {
  const config = getAuthConfig();
  const response = await axios.get(`${API_BASE_URL}/${learnerId}`, config);
  return response.data.learner || response.data;
};

/**
 * Updates a learner's details.
 */
export const updateLearner = async (learnerId, learnerData) => {
  const config = getAuthConfig();
  const response = await axios.put(
    `${API_BASE_URL}/${learnerId}`,
    learnerData,
    config
  );
  return response.data;
};

/**
 * Deletes a learner from the system.
 */
export const deleteLearner = async (learnerId) => {
  const config = getAuthConfig();
  await axios.delete(`${API_BASE_URL}/${learnerId}`, config);
  return true;
};

// ... other functions
