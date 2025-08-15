import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../LeanersAccount/AuthContext";
import { updateProfile } from "./ProfileService";

const ProfileSettings = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    location: "",
    description: "",
    disabled: false, // 1. ADD 'disabled' to state
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        contact: user.contact || "",
        location: user.location || "",
        description: user.description || "",
        disabled: user.disabled || false,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setImagePreview(user.image || null);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 2. ADD CLIENT-SIDE VALIDATION
    if (!formData.contact || !/^\+?[\d\s-()]+$/.test(formData.contact)) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!formData.description) {
      setError("Description is required.");
      return;
    }
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmNewPassword
    ) {
      setError("New passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const submissionData = new FormData();
      submissionData.append("firstName", formData.firstName);
      submissionData.append("lastName", formData.lastName);
      submissionData.append("contact", formData.contact);
      submissionData.append("location", formData.location);
      submissionData.append("description", formData.description);
      submissionData.append("disabled", formData.disabled); // 3. SEND 'disabled' field

      if (imageFile) {
        submissionData.append("image", imageFile);
      }
      if (formData.currentPassword && formData.newPassword) {
        submissionData.append("currentPassword", formData.currentPassword);
        submissionData.append("newPassword", formData.newPassword);
      }

      const response = await updateProfile(submissionData);

      // Update the user in the global context and localStorage
      login(response.user, localStorage.getItem("learnerToken"));

      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        {success && (
          <div className="p-3 bg-green-100 text-green-800 rounded">
            {success}
          </div>
        )}
        {error && (
          <div className="p-3 bg-red-100 text-red-800 rounded">{error}</div>
        )}

        <div className="flex items-center gap-6">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          <div>
            <label
              htmlFor="imageUpload"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Change Picture
            </label>
            <input
              id="imageUpload"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
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
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full mt-1 p-2 border rounded"
            required
          ></textarea>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Leave blank to keep current password"
              />
            </div>
            <div>
              <label className="block font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Disable Account</h2>
              <p className="text-sm text-gray-500">
                A disabled account cannot log in.
              </p>
            </div>
            <label
              htmlFor="disabled-toggle"
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                name="disabled"
                checked={formData.disabled}
                onChange={handleChange}
                id="disabled-toggle"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
