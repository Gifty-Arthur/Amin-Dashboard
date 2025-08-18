import axios from "axios";

const getToken = () => localStorage.getItem("learnerToken"); // Or "token" depending on what you use

const getAuthConfig = () => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      // Content-Type will be set automatically by the browser for FormData
    },
  };
};

const API_UPDATE_URL = "/api/auth/update";

/**
 * Updates the logged-in user's profile.
 * @param {FormData} profileData - The user's updated data, including image.
 */
// src/services/profileService.js
export const updateProfile = async (profileData) => {
  const config = getAuthConfig();
  const response = await axios.put("/api/auth/update", profileData, config);
  return response.data; // This should return { success: true, user: {...} }
};
