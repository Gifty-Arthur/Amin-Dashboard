import axios from "axios";

const API_BASE_URL = "/api/invoices";

const getToken = () => localStorage.getItem("token");

const getAuthConfig = () => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication token not found. [lease log in");
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllInvoices = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data.invoice || response.data;
};

export const getInvoiceById = async (invoiceId) => {
  const response = await axios.get(`${API_BASE_URL}/${invoiceId}`);
  return response.data.course || response.data;
};

export const createInvoice = async (invoiceData) => {
  const config = getAuthConfig();
  const response = await axios.post(API_BASE_URL, invoiceData, config);
  return response.data;
};

export const updateInvoice = async (invoiceData) => {
  const config = getAuthConfig();
  const response = await axios.put(
    `${API_BASE_URL}/${invoiceData.id}`,
    invoiceData,
    config
  );
  return response.data;
};

export const deleteInvoice = async (invoiceId) => {
  const config = getAuthConfig();
  await axios.delete(`${API_BASE_URL}/${invoiceId}`, config);
  return true;
};
