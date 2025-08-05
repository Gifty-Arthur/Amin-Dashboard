import axios from "axios";

const getToken = () => localStorage.getItem("token");

const getAuthConfig = () => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  return { headers: { Authorization: `Bearer ${token}` } };
};

// ✅ CORRECTED to match the path of your other APIs
const API_LOGOUT_URL = "/api/admin/auth/logout";

/**
 * Calls the backend API to invalidate the user's session/token.
 */
export const logout = async () => {
  const config = getAuthConfig();
  await axios.post(API_LOGOUT_URL, {}, config);
  return true;
};
