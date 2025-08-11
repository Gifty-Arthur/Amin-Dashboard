import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../LeanersAccount/AuthContext"; // To get the logged-in user
import { getTrackById } from "../../Component/Pages/Tracks/TrackService"; // To get track details
import { FaUser, FaEnvelope, FaGraduationCap } from "react-icons/fa";
import { createEnrollment } from "./enrollmentService";

const CheckOut = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the logged-in learner

  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch the details of the track the user wants to enroll in
    const fetchTrack = async () => {
      if (!trackId) return;
      try {
        const trackData = await getTrackById(trackId);
        setTrack(trackData);
      } catch (err) {
        console.error("Failed to fetch track:", err);
        setError("Could not load track details.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrack();
  }, [trackId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      // The payload for the enrollment API
      const enrollmentData = {
        track: trackId,
        // The backend can get the learnerId from the auth token
      };

      await createEnrollment(enrollmentData);

      alert("Enrollment successful!");
      navigate("/learner/dashboard"); // Navigate to a success page or learner dashboard
    } catch (err) {
      setError(
        err.response?.data?.message || "Enrollment failed. Please try again."
      );
      console.error("Enrollment error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!track) return <div className="text-center p-8">Track not found.</div>;

  return (
    <div>
      <div className="w-full bg-primary h-[135px] flex items-center justify-center">
        <h1 className="font-semibold text-white text-3xl">Checkout</h1>
      </div>
      <div className="max-w-xl mx-auto p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold border-b pb-4">Order Summary</h2>
          {/* Display Track Details */}
          <div className="flex items-center gap-4">
            <FaGraduationCap className="text-primary" size={24} />
            <div>
              <p className="font-semibold">{track.name}</p>
              <p className="text-2xl font-bold">${track.price}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold border-b pb-4">Your Details</h2>
          {/* Display User Details from Context */}
          <div className="relative">
            <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={`${user.firstName} ${user.lastName}`}
              className="w-full h-12 bg-gray-100 rounded-md pl-12 pr-4"
              readOnly
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={user.email}
              className="w-full h-12 bg-gray-100 rounded-md pl-12 pr-4"
              readOnly
            />
          </div>

          {/* Placeholder for Payment Section */}
          <p className="text-center text-gray-500">
            Payment will be processed via Paystack.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Complete Enrollment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
