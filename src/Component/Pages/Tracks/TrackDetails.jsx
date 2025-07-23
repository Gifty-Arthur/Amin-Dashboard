import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { IoPersonOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const TrackDetails = () => {
  const { trackId } = useParams();
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [submittingRating, setSubmittingRating] = useState(false);
  const [ratingError, setRatingError] = useState(null); // Error state for rating submission
  const [ratingSuccess, setRatingSuccess] = useState(false); // Success state for rating submission

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

  // Function to calculate average rating
  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) {
      return 0;
    }
    const totalRating = ratings.reduce((sum, r) => sum + r.rating, 0);
    return (totalRating / ratings.length).toFixed(1); // ToFixed to one decimal place
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
          // Add any authorization headers if needed, e.g., 'Authorization': `Bearer ${token}`
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
      setTimeout(() => setRatingSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (err) {
      setRatingError("Failed to submit rating: " + err.message);
    } finally {
      setSubmittingRating(false);
    }
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
              <LuPencil className="text-blue-500 cursor-pointer" />
              <RiDeleteBin6Line className="text-red-500 cursor-pointer" />
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
    </div>
  );
};

export default TrackDetails;
