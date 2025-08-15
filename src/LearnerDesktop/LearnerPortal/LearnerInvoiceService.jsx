import axios from "axios";

const API_BASE_URL = "/api/invoices";

const getToken = () => localStorage.getItem("learnerToken"); // Use the learner's token

const getAuthConfig = () => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication token not found. Please log in.");
  }
  return { headers: { Authorization: `Bearer ${token}` } };
};

/**
 * Fetches all invoices for the currently logged-in learner.
 */
export const getMyInvoices = async () => {
  const config = getAuthConfig();
  const response = await axios.get(API_BASE_URL, config);
  return response.data.invoices || response.data;
};
