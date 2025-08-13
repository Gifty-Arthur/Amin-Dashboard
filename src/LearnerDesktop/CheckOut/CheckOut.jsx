import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../LearnerDesktop/LeanersAccount/AuthContext";
import { getTrackById } from "../../Component/Pages/Tracks/TrackService";
import { createEnrollment } from "./enrollmentService";
import {
  FaUser,
  FaEnvelope,
  FaGraduationCap,
  FaVenusMars,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const CheckOut = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state is pre-populated from the logged-in user
  const [formData, setFormData] = useState({
    fullName: user ? `${user.firstName} ${user.lastName}` : "",
    email: user?.email || "",
    gender: user?.gender || "",
    contact: user?.contact || "",
    location: user?.location || "",
    description: user?.description || "",
  });

  useEffect(() => {
    const fetchTrackDetails = async () => {
      if (!trackId) {
        setError("No track specified.");
        setLoading(false);
        return;
      }
      try {
        const trackData = await getTrackById(trackId);
        setTrack(trackData);
      } catch (err) {
        setError("Could not load track details.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrackDetails();
  }, [trackId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ...
    try {
      // ... your createEnrollment call
    } catch (err) {
      const errorMessage =
        err.response?.data?.errors?.[0]?.message || "Enrollment failed.";
      // ✅ CATCH THE SPECIFIC ERROR AND REDIRECT
      if (errorMessage.includes("complete your profile")) {
        navigate("/complete-profile");
      } else {
        setError(errorMessage);
      }
      console.error("Enrollment error:", err);
    } // ...
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!track) return <div className="p-8 text-center">Track not found.</div>;

  return (
    <div>
      <div className="w-full bg-primary h-[135px] flex items-center justify-center">
        <h1 className="font-semibold text-white text-3xl">Checkout</h1>
      </div>
      <div className="flex flex-row  items-start justify-end gap-10">
        <div className="w-[508px] h-[720px] bg-white  rounded-lg p-8 pt-20">
          <div className="relative">
            <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full h-12 bg-gray-100 rounded-md pl-12 pr-4 mt-4"
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full h-12 bg-gray-100 rounded-md pl-12 pr-4 mt-4"
              required
            />
          </div>
          <div className="relative">
            <FaPhone className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full h-12 bg-gray-100 rounded-md pl-12 pr-4 mt-4"
              required
            />
          </div>
          <div className="relative">
            <FaVenusMars className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full h-12 bg-gray-100 rounded-md pl-12 pr-4  mt-4 appearance-none"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="relative">
            <FaMapMarkerAlt className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location (e.g., Accra, Ghana)"
              className="w-full h-12 bg-gray-100 rounded-md pl-12 pr-4 mt-4"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded bg-gray-100 mt-4"
            ></textarea>
          </div>
        </div>
        <div className="w-[408px] h-[421px] bg-white rounded-md shadow-2xl p-6">
          <form onSubmit={handleSubmit} className=" ">
            <h2 className="text-2xl font-bold border-b pb-4">Order Summary</h2>
            <div className="flex items-center gap-4">
              <FaGraduationCap className="text-primary" size={24} />
              <div>
                <p className="font-semibold">{track.name}</p>
                <p className="text-2xl font-bold">${track.price}</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold border-b pb-4">Your Details</h2>

            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg disabled:opacity-50"
            >
              {isSubmitting
                ? "Processing..."
                : `Pay $${track.price} and Enroll`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
