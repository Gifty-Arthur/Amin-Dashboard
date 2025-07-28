import axios from "axios";

const API_BASE_URL = "/api/invoices";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/**
 * Fetches all invoices.
 */
export const getAllInvoices = async () => {
  const config = getAuthConfig();
  const response = await axios.get(API_BASE_URL, config);
  return response.data.invoices || response.data;
};

/**
 * Fetches a single invoice by its ID.
 */
export const getInvoiceById = async (invoiceId) => {
  const config = getAuthConfig();
  const response = await axios.get(`${API_BASE_URL}/${invoiceId}`, config);
  return response.data.invoice || response.data;
};

/**
 * Creates a new invoice.
 */
export const createInvoice = async (invoiceData) => {
  const config = getAuthConfig();
  const response = await axios.post(API_BASE_URL, invoiceData, config);
  return response.data;
};

/**
 * Updates an existing invoice.
 */
export const updateInvoice = async (invoiceId, invoiceData) => {
  const config = getAuthConfig();
  const response = await axios.put(
    `${API_BASE_URL}/${invoiceId}`,
    invoiceData,
    config
  );
  return response.data;
};
