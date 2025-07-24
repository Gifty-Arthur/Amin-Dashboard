// src/services/trackService.js
import axios from "axios";

// Using a proxy, the base path is just /api
// This avoids hardcoding the full URL everywhere.
const API_URL = "/api/tracks";

/**
 * Fetches all tracks from the API.
 * @returns {Promise<Object>} The data from the API response.
 */
export const getAllTracks = async () => {
  try {
    // Make the GET request
    const response = await axios.get(API_URL);
    // Return the data part of the response
    return response.data;
  } catch (error) {
    // Improved error handling
    if (axios.isAxiosError(error) && error.response) {
      // If the API returns a specific error (e.g., 404, 500), throw it
      console.error("API Error:", error.response.data);
      throw error.response.data;
    }
    // For other errors (e.g., network failure), throw a generic message
    console.error("Network or other error:", error.message);
    throw new Error("Something went wrong while fetching tracks.");
  }
};
