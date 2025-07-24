// src/services/trackService.js
import axios from "axios";

// This is the base path for all track-related API calls
const API_BASE_URL = "/api/tracks";

// Helper function to get the token from localStorage
const getToken = () => localStorage.getItem("token");

// Helper function to create the authorization header
const getAuthConfig = () => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication token not found. Please log in.");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Helper function to handle inconsistent API responses
const extractTrackData = (response) => {
  if (response.data && response.data.track) return response.data.track;
  if (response.data && response.data.data) return response.data.data;
  return response.data;
};

/**
 * Fetches all tracks from the API.
 */
export const getAllTracks = async () => {
  const response = await axios.get(API_BASE_URL);
  // The list response has a 'tracks' property
  return response.data.tracks;
};

/**
 * Fetches a single track by its ID.
 */
export const getTrackById = async (trackId) => {
  const response = await axios.get(`${API_BASE_URL}/${trackId}`);
  return extractTrackData(response);
};

/**
 * Adds a rating and review to a track. (Requires Authentication)
 */
export const addRating = async (trackId, ratingData) => {
  const config = getAuthConfig();
  const response = await axios.post(
    `${API_BASE_URL}/${trackId}/ratings`,
    ratingData,
    config
  );
  return extractTrackData(response);
};

/**
 * Updates a track's details. (Requires Authentication)
 */
export const updateTrack = async (trackId, trackData) => {
  const config = getAuthConfig();
  const response = await axios.put(
    `${API_BASE_URL}/${trackId}`,
    trackData,
    config
  );
  return extractTrackData(response);
};

/**
 * Deletes a track by its ID. (Requires Authentication)
 */
export const deleteTrack = async (trackId) => {
  const config = getAuthConfig();
  await axios.delete(`${API_BASE_URL}/${trackId}`, config);
  return true;
};
