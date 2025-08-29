import axios from "axios";

const getToken = () => localStorage.getItem("learnerToken");

const getAuthConfig = () => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      // Content-Type is set automatically for FormData
    },
  };
};

/**
 * Updates the logged-in learner's profile using FormData.
 */
export const updateProfile = async (profileData) => {
  const config = getAuthConfig();
  // Use the specific endpoint for updating user/auth details
  const response = await axios.put("/api/auth/update", profileData, config);
  return response.data;
};
