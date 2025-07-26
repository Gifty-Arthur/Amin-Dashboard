import axios from "axios";

// The base path for all course-related API calls
const API_BASE_URL = "/api/courses";

const getToken = () => localStorage.getItem("token");

// Helper function to create the authorization header for protected requests
const getAuthConfig = () => {
  const token = getToken();
  if (!token) {
    // This prevents sending requests without being logged in
    throw new Error("Authentication token not found. Please log in.");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/**
 * Fetches all courses from the API.
 */
export const getAllCourses = async () => {
  const response = await axios.get(API_BASE_URL);
  // Assuming the API returns an object like { success: true, courses: [...] }
  return response.data.courses || response.data;
};

/**
 * Fetches a single course by its ID.
 * @param {string} courseId - The ID of the course.
 */
export const getCourseById = async (courseId) => {
  const response = await axios.get(`${API_BASE_URL}/${courseId}`);
  return response.data.course || response.data;
};

/**
 * @param {FormData} courseData -
 */
export const createCourse = async (courseData) => {
  const config = getAuthConfig();
  const response = await axios.post(API_BASE_URL, courseData, config);
  return response.data;
};

/**
 * @param {string} courseId
 * @param {FormData} courseData
 */
export const updateCourse = async (courseId, courseData) => {
  const config = getAuthConfig();
  const response = await axios.put(
    `${API_BASE_URL}/${courseId}`,
    courseData,
    config
  );
  return response.data;
};

/**
 * Deletes a course by its ID. (Requires Authentication)
 * @param {string} courseId - The ID of the course to delete.
 */
export const deleteCourse = async (courseId) => {
  const config = getAuthConfig();
  await axios.delete(`${API_BASE_URL}/${courseId}`, config);
  return true; // Return true on successful deletion
};
