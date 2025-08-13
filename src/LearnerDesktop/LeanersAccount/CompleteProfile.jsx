import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { updateProfile } from "../../Component/Pages/Learners/LearnersService";

const CompleteProfile = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contact: user?.contact || "",
    description: user?.description || "",
    location: user?.location || "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await updateProfile(formData);
      // Update the user in the global context and localStorage
      login(response.user, localStorage.getItem("learnerToken"));
      alert(
        "Profile updated successfully! You can now complete your enrollment."
      );
      // Go back to the previous page (the checkout page)
      navigate(-1);
    } catch (err) {
      setError("Failed to update profile.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>
      <p className="mb-6 text-gray-600">
        Please provide a few more details to continue.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Contact Number</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., Accra, Ghana"
          />
        </div>
        <div>
          <label className="block font-medium">About Me</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white font-bold py-3 rounded-lg disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save and Continue"}
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;
