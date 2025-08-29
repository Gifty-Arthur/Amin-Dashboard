import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../LearnerDesktop/LeanersAccount/AuthContext";
import { getTrackById } from "../../Component/Pages/Tracks/TrackService";
import { createEnrollment } from "./enrollmentService";
import { updateProfile } from "./enrollmentService";
import {
  FaUser,
  FaEnvelope,
  FaGraduationCap,
  FaVenusMars,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

const CheckOut = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Initialize form with default empty values
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    contact: "",
    location: "",
    description: "",
  });

  // Effect to fetch track details
  useEffect(() => {
    const fetchTrackDetails = async () => {
      if (!trackId) {
        setLoading(false);
        return setError("No track specified.");
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

  // Effect to pre-populate form when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: `${user.firstName || ""} ${user.lastName || ""}`,
        email: user.email || "",
        gender: user.gender || "",
        contact: user.contact || "",
        location: user.location || "",
        description: user.description || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to enroll.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      // --- Step 1: Update the user's profile first using FormData ---
      const profileUpdateData = new FormData();
      profileUpdateData.append("contact", formData.contact);
      profileUpdateData.append("gender", formData.gender);
      profileUpdateData.append("location", formData.location);
      profileUpdateData.append("description", formData.description);
      profileUpdateData.append("disabled", false); // Add the required 'disabled' field

      const updatedUserData = await updateProfile(profileUpdateData);
      login(updatedUserData.user, localStorage.getItem("learnerToken")); // Update global user state

      // --- Step 2: Proceed with the enrollment ---
      const enrollmentPayload = {
        track: trackId,
        learner: user._id,
        paystackCallbackUrl: `${window.location.origin}/payment-verification`,
      };
      const enrollmentResponse = await createEnrollment(enrollmentPayload);

      if (
        enrollmentResponse.authorization_url ||
        enrollmentResponse.transactionUrl
      ) {
        window.location.href =
          enrollmentResponse.authorization_url ||
          enrollmentResponse.transactionUrl;
      } else {
        setSuccess(true);
        setTimeout(() => navigate("/portal"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
      console.error("Checkout error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!track) return <div className="p-8 text-center">Track not found.</div>;

  if (success) {
    return (
      <div className="text-center p-20 flex flex-col items-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold">Successfully Enrolled!</h1>
        <p className="text-gray-600 mt-2">Redirecting you to your portal...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full bg-primary h-[135px] flex items-center justify-center">
        <h1 className="font-semibold text-white text-3xl">Checkout</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-10"
      >
        {/* --- Left Column: User Details --- */}
        <div className="w-full md:flex-1 bg-white rounded-lg p-8 space-y-4">
          <h2 className="text-2xl font-bold border-b pb-4">Your Details</h2>
          <div className="relative">
            <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={formData.fullName}
              className="w-full h-12 bg-gray-200 rounded-md pl-12 pr-4 cursor-not-allowed"
              readOnly
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              className="w-full h-12 bg-gray-200 rounded-md pl-12 pr-4 cursor-not-allowed"
              readOnly
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
              className="w-full h-12 bg-gray-100 rounded-md pl-12 pr-4"
              required
            />
          </div>
          <div className="relative">
            <FaVenusMars className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full h-12 bg-gray-100 rounded-md pl-12 pr-4 appearance-none"
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
              placeholder="Location"
              className="w-full h-12 bg-gray-100 rounded-md pl-12 pr-4"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded bg-gray-100"
            ></textarea>
          </div>
        </div>
        {/* --- Right Column: Order Summary --- */}
        <div className="w-full md:w-1/3 bg-white rounded-md shadow-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold border-b pb-4">Order Summary</h2>
          <div className="flex items-center gap-4">
            <FaGraduationCap className="text-primary" size={32} />
            <div>
              <p className="font-semibold text-lg">{track.name}</p>
              <p className="text-3xl font-bold">${track.price}</p>
            </div>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : `Pay $${track.price} and Enroll`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
