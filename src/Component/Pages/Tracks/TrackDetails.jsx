import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const TrackDetails = () => {
  const { trackId } = useParams(); // Get trackId from URL parameters
  const [track, setTrack] = useState(null); // State for track details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        // Change the URL to use the proxy
        const response = await fetch(`/api/tracks/${trackId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Try to handle both direct object and {track: {...}} or {data: {...}}
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
        <Link to="/" className="text-blue-600 underline">
          Back to Tracks
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow">
      <Link to="/" className="text-blue-600 underline block mb-4">
        ← Back to Tracks
      </Link>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <img
            src={track.image}
            alt={track.name}
            className="w-64 h-64 object-cover rounded-lg shadow border"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{track.name}</h1>
          <p className="text-gray-700 mb-4">{track.description}</p>
          <div className="mb-2">
            <strong>Instructor:</strong> {track.instructor}
          </div>
          <div className="mb-2">
            <strong>Price:</strong> ${track.price}
          </div>
          <div className="mb-2">
            <strong>Duration:</strong> {track.duration}
          </div>
          <div className="mb-2">
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
          {track.ratings && track.ratings.length > 0 && (
            <div>
              <strong>Reviews:</strong> {track.ratings.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackDetails;
