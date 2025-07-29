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

// Base URL for learner-related actions
const API_BASE_URL = "/api/learners";

/**
 * Fetches all learners from the API.
 */
export const getAllLearners = async () => {
  const config = getAuthConfig();
  const response = await axios.get(API_BASE_URL, config);
  // Assumes API returns { learners: [...] } or the array directly
  return response.data.learners || response.data;
};

/**
 * Fetches a single learner by their ID.
 * @param {string} learnerId - The unique ID of the learner.
 */
export const getLearnerById = async (learnerId) => {
  const config = getAuthConfig();
  const response = await axios.get(`${API_BASE_URL}/${learnerId}`, config);
  return response.data.learner || response.data;
};

/**
 * Updates a learner's details.
 * @param {string} learnerId - The ID of the learner to update.
 * @param {object} learnerData - An object with the fields to update.
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
 * @param {string} learnerId - The ID of the learner to delete.
 */
export const deleteLearner = async (learnerId) => {
  const config = getAuthConfig();
  await axios.delete(`${API_BASE_URL}/${learnerId}`, config);
  return true; // Return true on success
};

/**
 * Enrolls a learner in a specific course.
 * @param {string} learnerId - The ID of the learner to enroll.
 * @param {string} courseId - The ID of the course to enroll them in.
 */
export const enrollLearnerInCourse = async (learnerId, courseId) => {
  const config = getAuthConfig();
  // This endpoint assumes the API is structured to handle enrollments this way
  const response = await axios.post(
    `${API_BASE_URL}/${learnerId}/enrollments`,
    { courseId }, // Send the course ID in the request body
    config
  );
  return response.data;
};
