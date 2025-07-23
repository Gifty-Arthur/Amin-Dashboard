import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const AddNewTrack = ({ isOpen, onClose, onAddTrack }) => {
  const [trackName, setTrackName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [instructor, setInstructor] = useState("");
  const [picture, setPicture] = useState(null); // For the File object
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // This is crucial to prevent default form submission behavior

    setIsSubmitting(true);
    setError("");

    try {
      // Validate required fields
      if (
        !trackName.trim() ||
        !price || // Price check is fine for non-empty string
        !duration.trim() ||
        !instructor.trim() ||
        !description.trim()
      ) {
        throw new Error("Please fill in all required fields.");
      }

      // Get authentication token
      // IMPORTANT: In a real application, fetch this dynamically (e.g., from context, Redux, localStorage)
      // Hardcoding tokens is fine for quick testing but not for production.
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdhNDZkZTBhZTRjZWE5Nzk4M2Q5NDMiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3NTMzMDkwMzYsImV4cCI6MTc1MzkxMzgzNn0.v0lT5Bz_vLLKjC4xh-V_9KSmBwzAomEl6GP02ZN-bSE";

      const formData = new FormData();
      formData.append("name", trackName.trim());
      formData.append("price", price); // Price should be sent as a number if API expects it
      formData.append("duration", duration.trim());
      formData.append("instructor", instructor.trim());
      formData.append("description", description.trim());

      if (picture) {
        formData.append("image", picture); // 'image' should match the field name expected by your API for the file
      }

      console.log("Sending FormData with fields:");
      for (let pair of formData.entries()) {
        console.log(
          pair[0] +
            ": " +
            (pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1])
        );
      }
      console.log("Using token:", token.substring(0, 20) + "...");

      const response = await fetch(
        "https://tmp-se-projectapi.azurewebsites.net/api/tracks",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // IMPORTANT: Do NOT set 'Content-Type': 'multipart/form-data' here.
            // The browser sets it automatically with the correct boundary when you use FormData.
          },
          body: formData,
        }
      );

      console.log("Response status:", response.status);
      console.log("Response headers:", [...response.headers.entries()]);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Full error response:", errorText);
        console.log("Response status:", response.status);
        console.log("Response statusText:", response.statusText);

        let errorData;
        try {
          errorData = JSON.parse(errorText);
          console.log("Parsed error data:", errorData);
        } catch (parseError) {
          console.log("Could not parse error as JSON:", parseError);
          errorData = {
            message:
              errorText || `HTTP ${response.status}: ${response.statusText}`,
          };
        }

        const errorMessage =
          errorData.message ||
          errorData.error || // Check for a common 'error' field
          errorText ||
          `Server returned ${response.status} error`;
        throw new Error(errorMessage);
      }

      const newTrackData = await response.json(); // The created track data from API

      // Call the parent component's callback with the newly created track data
      if (onAddTrack) {
        // You might need to adjust what the API returns.
        // If it returns a nested object (e.g., { data: newTrack }), extract it.
        // Assuming your API returns the new track directly or under a 'data' key.
        onAddTrack(newTrackData.data || newTrackData.track || newTrackData);
      }

      // Reset form and close modal
      resetForm();
      onClose();
    } catch (err) {
      console.error("Error creating track:", err);
      setError(err.message || "Failed to create track. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTrackName("");
    setPrice("");
    setDuration("");
    setInstructor("");
    setPicture(null);
    setDescription("");
    setError("");
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 disabled:opacity-50"
        >
          <IoClose size={24} />
        </button>
        <h2 className="text-[28px] font-bold font-figtree mb-6 text-tert text-center">
          Add New Track
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        {/* This div should be a <form> tag */}
        <form onSubmit={handleSubmit}>
          {" "}
          {/* <-- CHANGE HERE */}
          <div className="mb-4">
            <label
              htmlFor="trackName"
              className="block text-black text-sm font-medium mb-2"
            >
              Track name *
            </label>
            <input
              type="text"
              id="trackName"
              className="shadow-lg appearance-auto rounded w-full py-2 px-3 text-gray-700 leading-1.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={trackName}
              onChange={(e) => setTrackName(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Price *
            </label>
            <input
              type="number" // Ensure type is number
              id="price"
              min="0"
              step="0.01"
              className="shadow-lg appearance-auto rounded w-full py-2 px-3 text-gray-700 leading-1.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="duration"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Duration *
            </label>
            <input
              type="text"
              id="duration"
              placeholder="e.g., 2 weeks, 30 days"
              className="shadow-lg appearance-auto rounded w-full py-2 px-3 text-gray-700 leading-1.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="instructor"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Instructor *
            </label>
            <input
              type="text"
              id="instructor"
              className="shadow-lg appearance-auto rounded w-full py-2 px-3 text-gray-700 leading-1.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="picture"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Picture
            </label>
            <input
              type="file"
              id="picture"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-1 file:text-sm disabled:opacity-50"
              onChange={(e) => setPicture(e.target.files[0])}
              disabled={isSubmitting}
            />
            {picture && (
              <p className="text-xs text-gray-500 mt-1">
                Selected: {picture.name}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              rows="3"
              className="shadow-lg appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              required
            ></textarea>
          </div>
          <div className="flex gap-3">
            <button
              type="button" // This button cancels and closes the modal
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit" // This button submits the form
              disabled={isSubmitting}
              className="flex-1 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Track"
              )}
            </button>
          </div>
        </form>{" "}
        {/* <-- CHANGE HERE */}
      </div>
    </div>
  );
};

export default AddNewTrack;
