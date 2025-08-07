import axios from "axios";

const getToken = () => localStorage.getItem("learnerToken");

const getAuthConfig = () => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const checkAuth = async () => {
  const config = getAuthConfig();
  const response = await axios.get("/api/auth/check-auth", config);
  return response.data;
};

// Add your login and logout functions here as well
export const loginUser = async (credentials) => {
  const response = await axios.post("/api/auth/login/learner", credentials);
  return response.data;
};

export const logoutUser = async () => {
  const config = getAuthConfig();
  await axios.post("/api/auth/logout", {}, config); // Assuming a general logout endpoint
  return true;
};
