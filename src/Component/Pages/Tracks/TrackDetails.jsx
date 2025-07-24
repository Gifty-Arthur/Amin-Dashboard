import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTrackById,
  addRating,
  updateTrack,
  deleteTrack,
} from "./TrackService.jsx";

// Your Icon Imports
import { LuPencil } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { IoPersonOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const TrackDetails = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();

  // --- STATE DEFINITIONS ---
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for creating a new rating
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [submittingRating, setSubmittingRating] = useState(false);
  const [ratingError, setRatingError] = useState(null);
  const [ratingSuccess, setRatingSuccess] = useState(false);

  // State for the update modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    instructor: "",
    duration: "",
    price: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  // State for the delete modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // --- DATA FETCHING & LOGIC ---
  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        setLoading(true);
        const trackData = await getTrackById(trackId);
        setTrack(trackData);
        setUpdateFormData({
          name: trackData.name || "",
          instructor: trackData.instructor || "",
          duration: trackData.duration || "",
          price: trackData.price || "",
          description: trackData.description || "",
        });
      } catch (err) {
        setError("Could not load track details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrackDetails();
  }, [trackId]);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (newRating === 0) {
      setRatingError("Please select a star rating.");
      return;
    }
    if (!newTitle.trim()) {
      setRatingError("Please enter a title for your review.");
      return;
    }
    if (newReview.trim() && newReview.trim().length < 10) {
      setRatingError("Review must be at least 10 characters long.");
      return;
    }
    setSubmittingRating(true);
    setRatingError(null);
    try {
      const updatedTrack = await addRating(trackId, {
        title: newTitle,
        rating: newRating,
        review: newReview.trim(),
      });
      setTrack(updatedTrack);
      setNewRating(0);
      setNewReview("");
      setNewTitle("");
      setRatingSuccess(true);
      setTimeout(() => setRatingSuccess(false), 3000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to submit rating.";
      setRatingError(errorMessage);
      console.error(err);
    } finally {
      setSubmittingRating(false);
    }
  };

  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateError(null);
    const submissionData = new FormData();
    Object.keys(updateFormData).forEach((key) => {
      submissionData.append(key, updateFormData[key]);
    });
    if (imageFile) {
      submissionData.append("image", imageFile);
    }
    try {
      const updatedTrack = await updateTrack(trackId, submissionData);
      setTrack(updatedTrack);
      setShowUpdateModal(false);
      setImageFile(null);
    } catch (err) {
      setUpdateError(err.response?.data?.error || "Failed to update track.");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteTrack(trackId);
      navigate("/trek");
    } catch (err) {
      setDeleteError("Failed to delete track.");
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const totalRating = ratings.reduce((sum, r) => sum + r.rating, 0);
    return (totalRating / ratings.length).toFixed(1);
  };

  // --- JSX FOR RENDERING ---
  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!track) return <div className="text-center p-8">Track not found.</div>;

  const averageRating = calculateAverageRating(track.ratings);

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img
          src={track.image}
          alt={track.name}
          className="w-full h-auto max-h-[400px] object-cover rounded-lg mb-6"
        />
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl md:text-4xl font-bold">{track.name}</h1>
          <p className="text-2xl md:text-3xl font-bold text-gray-800">
            ${track.price}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 text-gray-600">
          <div className="flex items-center">
            <IoPersonOutline className="mr-1.5" /> {track.instructor}
          </div>
          <div className="flex items-center">
            <SlCalender className="mr-1.5" /> {track.duration}
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={
                  index < Math.floor(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="ml-2 font-semibold text-gray-700">
            {averageRating}
          </span>
          <span className="ml-1 text-gray-500">
            ({track.ratings ? track.ratings.length : 0} reviews)
          </span>
        </div>
        <p className="text-gray-700 mb-6">{track.description}</p>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold mb-2">Courses Included</h3>
            {track.courses && track.courses.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-600">
                {track.courses.map((course) => (
                  <li key={course._id}>{course.title}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No courses listed.</p>
            )}
          </div>
          <div className="flex gap-4 items-center">
            <LuPencil
              title="Edit Track"
              className="text-xl text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={() => setShowUpdateModal(true)}
            />
            <RiDeleteBin6Line
              title="Delete Track"
              className="text-xl text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => setShowDeleteConfirm(true)}
            />
          </div>
        </div>
        <hr className="my-8" />
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-3">Leave a Review</h3>
          <form onSubmit={handleRatingSubmit}>
            <div className="mb-3">
              <label htmlFor="reviewTitle" className="sr-only">
                Review Title
              </label>
              <input
                id="reviewTitle"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Review Title"
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-3">
              <div className="flex items-center gap-1">
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
                      <FaStar
                        className="text-2xl cursor-pointer"
                        color={ratingValue <= newRating ? "#ffc107" : "#e4e5e9"}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              rows="3"
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Share your experience..."
            ></textarea>
            {ratingError && (
              <p className="text-red-500 text-sm mt-2">{ratingError}</p>
            )}
            {ratingSuccess && (
              <p className="text-green-600 text-sm mt-2">
                Thank you for your review!
              </p>
            )}
            <button
              type="submit"
              className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={submittingRating}
            >
              {submittingRating ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
        {track.ratings && track.ratings.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">
              What Others Are Saying
            </h3>
            <div className="space-y-6">
              {track.ratings.map((rating) => (
                <div key={rating._id} className="border-b pb-4">
                  <h4 className="font-semibold">{rating.title}</h4>
                  <div className="flex items-center my-2">
                    {[...Array(5)].map((_, starIndex) => (
                      <FaStar
                        key={starIndex}
                        className={
                          starIndex < rating.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  {rating.review && (
                    <p className="text-gray-800 italic">"{rating.review}"</p>
                  )}
                  <p className="text-gray-500 text-sm mt-2">
                    Reviewed on:{" "}
                    {new Date(rating.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- UPDATE MODAL --- */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Update Track</h2>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="text-3xl font-light leading-none hover:text-red-600"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleUpdateSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Track name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={updateFormData.name}
                    onChange={handleUpdateFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={updateFormData.price}
                    onChange={handleUpdateFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={updateFormData.duration}
                    onChange={handleUpdateFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Instructor
                  </label>
                  <input
                    type="text"
                    name="instructor"
                    value={updateFormData.instructor}
                    onChange={handleUpdateFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Picture
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={updateFormData.description}
                    onChange={handleUpdateFormChange}
                    rows="4"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  ></textarea>
                </div>
              </div>
              {updateError && (
                <p className="text-red-500 text-sm mt-4">{updateError}</p>
              )}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  {updating ? "Updating..." : "Update Track"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete the track "{track.name}"? This
              action cannot be undone.
            </p>
            {deleteError && (
              <p className="text-red-500 text-xs italic mb-4">{deleteError}</p>
            )}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackDetails;
