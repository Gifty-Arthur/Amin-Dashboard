import React, { useState, useEffect } from "react";
import { LuPencil } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import Title from "../../Titles/titles";
import Subt from "../../Titles/subt";
import AddTask from "../../Buttons/AddTask";
import SearchBar from "../../Buttons/Searchbar";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "./CourseServices";
import { getAllTracks } from "../Tracks/TrackService";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getAllCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to display courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => setIsAddModalOpen(true);
  const handleUpdateClick = (course) => {
    setSelectedCourse(course);
    setIsUpdateModalOpen(true);
  };
  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setIsDeleteModalOpen(true);
  };

  const handleCourseAdded = (newCourse) => {
    setCourses((prev) => [newCourse, ...prev]);
    setIsAddModalOpen(false);
  };
  const handleCourseUpdated = (updatedCourse) => {
    setCourses(
      courses.map((c) =>
        c._id === updatedCourse._id ? { ...c, ...updatedCourse } : c
      )
    );
    setIsUpdateModalOpen(false);
  };
  const handleCourseDeleted = (deletedCourseId) => {
    setCourses(courses.filter((c) => c._id !== deletedCourseId));
    setIsDeleteModalOpen(false);
  };

  const filteredCourses = courses.filter((course) =>
    (course.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Title text="Manage Courses" />
      <Subt text="Filter, sort, and manage all courses" />
      <div className="mt-6 flex items-center justify-between">
        <div className="w-full md:w-1/3">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search for a course..."
          />
        </div>
        <AddTask
          onClick={handleAddClick}
          className="flex items-center justify-center gap-2"
        >
          <FaPlus />
          Add Course
        </AddTask>
      </div>
      <div className="mt-8 bg-white p-4 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-b-gray-200">
              <th className="p-4 text-[#7F7E83] font-Figtree font-light text-[14px]">
                COURSE
              </th>
              <th className="p-4 text-[#7F7E83] font-Figtree font-light text-[14px]">
                TRACK
              </th>
              <th className="p-4 text-[#7F7E83] font-Figtree font-light text-[14px]">
                DATE CREATED
              </th>
              <th className="p-4 text-[#7F7E83] font-Figtree font-light text-[14px]">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : currentCourses.length > 0 ? (
              currentCourses.map((course) => (
                <tr key={course._id} className="hover:bg-gray-50">
                  <td className="p-4 text-tert font-semibold text-[16px] flex items-center gap-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-16 h-10 object-cover rounded"
                    />
                    <span>{course.title}</span>
                  </td>
                  <td className="p-4 text-[#2E2C48] text-[16px] font-light font-figtree">
                    {course.track?.name || "N/A"}
                  </td>
                  <td className="p-4 text-[#2E2C48] text-[16px] font-light font-figtree">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleUpdateClick(course)}
                        title="Edit Course"
                      >
                        <LuPencil className="text-blue-500 hover:text-blue-700" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(course)}
                        title="Delete Course"
                      >
                        <RiDeleteBin6Line className="text-red-500 hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          {/* Pagination Controls */}
        </div>
      )}

      {isAddModalOpen && (
        <AddNewCourse
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onCourseAdded={handleCourseAdded}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateCourseModal
          course={selectedCourse}
          onClose={() => setIsUpdateModalOpen(false)}
          onCourseUpdated={handleCourseUpdated}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          course={selectedCourse}
          onClose={() => setIsDeleteModalOpen(false)}
          onCourseDeleted={handleCourseDeleted}
        />
      )}
    </div>
  );
};

// --- MODAL COMPONENTS ---

const AddNewCourse = ({ isOpen, onClose, onCourseAdded }) => {
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
    setIsSubmitting(true);
    setError("");
    try {
      const submissionData = new FormData();
      submissionData.append("title", formData.title);
      submissionData.append("track", formData.track);
      submissionData.append("description", formData.description);
      if (imageFile) {
        submissionData.append("image", imageFile);
      }
      const newCourseData = await createCourse(submissionData);
      onCourseAdded(newCourseData.course || newCourseData.data);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UpdateCourseModal = ({ course, onClose, onCourseUpdated }) => {
  const [formData, setFormData] = useState({
    title: course.title || "",
    track: course.track?._id || "",
    description: course.description || "",
  });
  const [allTracks, setAllTracks] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTracksForDropdown = async () => {
      try {
        const tracksData = await getAllTracks();
        setAllTracks(Array.isArray(tracksData) ? tracksData : []);
      } catch (err) {
        console.error("Failed to fetch tracks:", err);
      }
    };
    fetchTracksForDropdown();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setError("");
    try {
      const submissionData = new FormData();
      submissionData.append("title", formData.title);
      submissionData.append("track", formData.track);
      submissionData.append("description", formData.description);
      if (imageFile) {
        submissionData.append("image", imageFile);
      }
      const updatedData = await updateCourse(course._id, submissionData);

      const selectedTrackObject = allTracks.find(
        (t) => t._id === formData.track
      );
      const manuallyUpdatedCourse = {
        ...course,
        ...(updatedData.course || updatedData.data),
        track: selectedTrackObject || course.track,
      };
      onCourseUpdated(manuallyUpdatedCourse);
    } catch (err) {
      setError("Failed to update course.");
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Update Course</h2>
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
              disabled={isUpdating}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({ course, onClose, onCourseDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");
    try {
      await deleteCourse(course._id);
      onCourseDeleted(course._id);
    } catch (err) {
      setError("Failed to delete course.");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete the course "{course.title}"?</p>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-500 text-white rounded-md disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
