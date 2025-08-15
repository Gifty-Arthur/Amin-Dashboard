import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { createCourse } from "./CourseServices";
import { getAllTracks } from "../Tracks/TrackService";

const AddCourse = ({ isOpen, onClose, onCourseAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    track: "",
    description: "",
  });
  const [allTracks, setAllTracks] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      const fetchTracksForDropdown = async () => {
        try {
          const tracksData = await getAllTracks();
          setAllTracks(Array.isArray(tracksData) ? tracksData : []);
        } catch (err) {
          console.error("Failed to fetch tracks for dropdown:", err);
        }
      };
      fetchTracksForDropdown();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.description.trim().length < 10) {
      setError("Description must be at least 10 characters long.");
      setIsSubmitting(false); // Make sure to stop submission
      return;
    }
    setIsSubmitting(true);
    try {
      const submissionData = new FormData();
      submissionData.append("title", formData.title);
      submissionData.append("track", formData.track);
      submissionData.append("description", formData.description);
      if (imageFile) {
        submissionData.append("image", imageFile);
      }

      const newCourseData = await createCourse(submissionData);

      // ✅ CORRECTED: Call the functions to update the parent and close the modal
      onCourseAdded(newCourseData.course || newCourseData.data);
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.errors?.[0]?.message || "Failed to create course."
      );
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0   bg-red/50 backdrop-blur-3xl flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Course</h2>
          <button onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* ✅ CORRECTED: Removed the redundant text input */}
          <div>
            <label className="block mb-1 font-medium">Track</label>
            <select
              name="track"
              value={formData.track}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white"
              required
            >
              <option value="" disabled>
                Select a track
              </option>
              {allTracks.map((track) => (
                <option key={track._id} value={track._id}>
                  {track.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Picture</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>

          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting} // This is controlled by the state
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 hover:bg-primary"
            >
              {isSubmitting ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
