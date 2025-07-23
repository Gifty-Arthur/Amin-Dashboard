import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { IoPersonOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const TrackDetails = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [submittingRating, setSubmittingRating] = useState(false);
  const [ratingError, setRatingError] = useState(null);
  const [ratingSuccess, setRatingSuccess] = useState(false);

  // Update modal states
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    instructor: "",
    duration: "",
    price: "",
    description: "",
    image: "",
  });
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  // Delete confirmation states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        const response = await fetch(`/api/tracks/${trackId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.track) {
          setTrack(data.track);
        } else if (data.data) {
          setTrack(data.data);
        } else {
          setTrack(data);
        }
      } catch (err) {
        setError("Could not load track details. " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackDetails();
  }, [trackId]);

  // Initialize update form when track is loaded
  useEffect(() => {
    if (track) {
      setUpdateFormData({
        name: track.name || "",
        instructor: track.instructor || "",
        duration: track.duration || "",
        price: track.price || "",
        description: track.description || "",
        image: track.image || "",
      });
    }
  }, [track]);

  // Function to calculate average rating
  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) {
      return 0;
    }
    const totalRating = ratings.reduce((sum, r) => sum + r.rating, 0);
    return (totalRating / ratings.length).toFixed(1);
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    setSubmittingRating(true);
    setRatingError(null);
    setRatingSuccess(false);

    if (newRating === 0) {
      setRatingError("Please select a star rating.");
      setSubmittingRating(false);
      return;
    }

    try {
      const response = await fetch(`/api/tracks/${trackId}/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: newRating,
          review: newReview,
        }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to parse error response." }));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const updatedTrack = await response.json();
      const fetchResponse = await fetch(`/api/tracks/${trackId}`);
      if (!fetchResponse.ok) {
        throw new Error(
          `HTTP error! status: ${fetchResponse.status} during re-fetch`
        );
      }
      const fetchedData = await fetchResponse.json();
      if (fetchedData.track) {
        setTrack(fetchedData.track);
      } else if (fetchedData.data) {
        setTrack(fetchedData.data);
      } else {
        setTrack(fetchedData);
      }

      setRatingSuccess(true);
      setNewRating(0);
      setNewReview("");
      setTimeout(() => setRatingSuccess(false), 3000);
    } catch (err) {
      setRatingError("Failed to submit rating: " + err.message);
    } finally {
      setSubmittingRating(false);
    }
  };

  // Handle track update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateError(null);

    try {
      const response = await fetch(`/api/tracks/${trackId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateFormData),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to parse error response." }));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const updatedTrack = await response.json();

      // Update the track state with new data
      if (updatedTrack.track) {
        setTrack(updatedTrack.track);
      } else if (updatedTrack.data) {
        setTrack(updatedTrack.data);
      } else {
        setTrack(updatedTrack);
      }

      setShowUpdateModal(false);
      // You could show a success message here if desired
    } catch (err) {
      setUpdateError("Failed to update track: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  // Handle track deletion
  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);

    try {
      const response = await fetch(`/api/tracks/${trackId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to parse error response." }));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      // Navigate back to tracks list after successful deletion
      navigate("/trek");
    } catch (err) {
      setDeleteError("Failed to delete track: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <p className="text-gray-500">Loading track details...</p>
      </div>
    );
  }

  if (error || !track) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <p className="text-red-500">{error || "No details found."}</p>
        <Link to="/trek" className="text-blue-600 ">
          Back to Tracks
        </Link>
      </div>
    );
  }

  const averageRating = calculateAverageRating(track.ratings);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow">
      <div className="flex flex-col md:flex-col gap-8">
        <div className="flex-shrink-0">
          <img
            src={track.image}
            alt={track.name}
            className="w-[672px] h-[342px] object-cover rounded-lg shadow border ml-4"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
        <div className="">
          <h1 className="text-3xl font-bold mb-2">{track.name}</h1>
          <div className="flex items-center justify-between">
            <div className="flex gap-6 mb-2">
              <div className="flex">
                <IoPersonOutline className="mt-1 mr-1" /> {track.instructor}
              </div>
              <div className="flex">
                <SlCalender className="mt-1 mr-1" />
                {track.duration}
              </div>
            </div>
            <div className="mb-2 font-bold">${track.price}</div>
          </div>
          <p className="text-gray-700 mb-4">{track.description}</p>

          <div className="flex  items-center justify-between">
            <div className="mb-4">
              <strong>Courses:</strong>
              {track.courses && track.courses.length > 0 ? (
                <ul className="list-disc pl-5">
                  {track.courses.map((course) => (
                    <li key={course._id}>{course.title}</li>
                  ))}
                </ul>
              ) : (
                <span>No courses listed.</span>
              )}
            </div>
            <div className="flex gap-4">
              <LuPencil
                className="text-blue-500 cursor-pointer hover:text-blue-700 text-xl"
                onClick={() => setShowUpdateModal(true)}
                title="Edit Track"
              />
              <RiDeleteBin6Line
                className="text-red-500 cursor-pointer hover:text-red-700 text-xl"
                onClick={() => setShowDeleteConfirm(true)}
                title="Delete Track"
              />
            </div>
          </div>

          {/* Average Rating Display */}
          <div className="flex items-center mb-4">
            <strong className="mr-2">Rating:</strong>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < Math.floor(averageRating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="ml-2 text-gray-700">
              {averageRating} ({track.ratings ? track.ratings.length : 0}{" "}
              reviews)
            </span>
          </div>

          {/* Add a Rating Section */}
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold mb-3">Add Your Rating</h2>
            <form onSubmit={handleRatingSubmit}>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Your Rating:
                </label>
                <div className="flex">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={ratingValue}>
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onClick={() => setNewRating(ratingValue)}
                          className="hidden"
                        />
                        {newRating >= ratingValue ? (
                          <FaStar className="text-yellow-500 text-2xl cursor-pointer" />
                        ) : (
                          <CiStar className="text-gray-400 text-2xl cursor-pointer" />
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="review"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Your Review (optional):
                </label>
                <textarea
                  id="review"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Share your thoughts about this track..."
                ></textarea>
              </div>
              {ratingError && (
                <p className="text-red-500 text-sm mb-3">{ratingError}</p>
              )}
              {ratingSuccess && (
                <p className="text-green-600 text-sm mb-3">
                  Rating submitted successfully!
                </p>
              )}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={submittingRating}
              >
                {submittingRating ? "Submitting..." : "Submit Rating"}
              </button>
            </form>
          </div>

          {/* Individual Reviews Display */}
          {track.ratings && track.ratings.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              {track.ratings.map((rating, index) => (
                <div key={rating._id || index} className="border-b pb-4 mb-4">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, starIndex) => (
                      <FaStar
                        key={starIndex}
                        className={
                          starIndex < rating.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="ml-2 text-gray-600 font-medium">
                      {rating.rating} / 5
                    </span>
                  </div>
                  {rating.review && (
                    <p className="text-gray-800 italic">"{rating.review}"</p>
                  )}
                  {rating.createdAt && (
                    <p className="text-gray-500 text-sm mt-1">
                      Reviewed on:{" "}
                      {new Date(rating.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Update Track</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Track Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={updateFormData.name}
                  onChange={handleUpdateFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Instructor:
                </label>
                <input
                  type="text"
                  name="instructor"
                  value={updateFormData.instructor}
                  onChange={handleUpdateFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Duration:
                </label>
                <input
                  type="text"
                  name="duration"
                  value={updateFormData.duration}
                  onChange={handleUpdateFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Price:
                </label>
                <input
                  type="number"
                  name="price"
                  value={updateFormData.price}
                  onChange={handleUpdateFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={updateFormData.description}
                  onChange={handleUpdateFormChange}
                  rows="3"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Image URL:
                </label>
                <input
                  type="url"
                  name="image"
                  value={updateFormData.image}
                  onChange={handleUpdateFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {updateError && (
                <p className="text-red-500 text-sm mb-4">{updateError}</p>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowUpdateModal(false);
                    setUpdateError(null);
                  }}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Update Track"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Confirm Delete
            </h2>
            <p className="mb-4">
              Are you sure you want to delete this track? This action cannot be
              undone.
            </p>
            <p className="mb-6 font-semibold">Track: {track.name}</p>
            {deleteError && (
              <p className="text-red-500 text-sm mb-4">{deleteError}</p>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteError(null);
                }}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete Track"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackDetails;
