import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../Titles/titles";
import Subt from "../../Titles/subt";
import AddTask from "../../Buttons/AddTask";
import SearchBar from "../../Buttons/Searchbar";
import { FaPlus } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { getAllCourses, updateCourse, deleteCourse } from "./CourseServices";

import AddCourse from "./AddCourse";

const Courses = () => {
  // --- STATE DEFINITIONS ---
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;

  // Modal States
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  //modal

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // ... other states for update/delete modals ...

  // Handlers for the AddCourse modal
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const handleCourseAdded = (newCourse) => {
    setCourses((prevCourses) => [newCourse, ...prevCourses]);
    closeAddModal();
  };

  // --- DATA FETCHING ---
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

  // --- EVENT HANDLERS ---
  const handleUpdateClick = (course) => {
    setSelectedCourse(course);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const handleCourseUpdated = (updatedCourse) => {
    setCourses(
      courses.map((c) => (c._id === updatedCourse._id ? updatedCourse : c))
    );
    setShowUpdateModal(false);
  };

  const handleCourseDeleted = (deletedCourseId) => {
    setCourses(courses.filter((c) => c._id !== deletedCourseId));
    setShowDeleteModal(false);
  };

  // --- FILTERING & PAGINATION LOGIC ---
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
          onClick={openAddModal}
          className="flex items-center justify-center gap-2"
        >
          <FaPlus />
          Add Course
        </AddTask>
      </div>

      <div className="mt-8 bg-white p-4 rounded-xl shadow overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500 p-8">Loading courses...</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-4">Course</th>
                <th className="p-4">Track</th>
                <th className="p-4">Date Created</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.length > 0 ? (
                currentCourses.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50">
                    <td className="p-4 flex items-center gap-4">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-16 h-10 object-cover rounded"
                      />
                      <span className="font-medium">{course.title}</span>
                    </td>
                    <td className="p-4 text-gray-600">
                      {course.track?.name || "N/A"}
                    </td>
                    <td className="p-4 text-gray-600">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleUpdateClick(course)}
                          title="Edit Course"
                        >
                          <LuPencil className="text-blue-500 cursor-pointer hover:text-blue-700" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(course)}
                          title="Delete Course"
                        >
                          <RiDeleteBin6Line className="text-red-500 cursor-pointer hover:text-red-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-gray-500">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 0 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border rounded-md disabled:opacity-50"
          >
            &larr; Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 w-[40px] border rounded-md ${
                currentPage === index + 1 ? "bg-primary text-white" : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border rounded-md disabled:opacity-50"
          >
            Next &rarr;
          </button>
        </div>
      )}

      <AddCourse
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onCourseAdded={handleCourseAdded}
      />

      {showUpdateModal && (
        <UpdateCourseModal
          course={selectedCourse}
          onClose={() => setShowUpdateModal(false)}
          onCourseUpdated={handleCourseUpdated}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          course={selectedCourse}
          onClose={() => setShowDeleteModal(false)}
          onCourseDeleted={handleCourseDeleted}
        />
      )}
    </div>
  );
};

// --- MODAL COMPONENTS ---

const UpdateCourseModal = ({ course, onClose, onCourseUpdated }) => {
  const [formData, setFormData] = useState({
    title: course.title || "",
    track: course.track?._id || "",
    description: course.description || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

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
      onCourseUpdated(updatedData.course || updatedData.data);
    } catch (err) {
      setError("Failed to update course.");
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm  flex items-center justify-center z-50 p-4">
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
            <label className="block mb-1 font-medium">Track ID</label>
            <input
              type="text"
              name="track"
              value={formData.track}
              onChange={handleChange}
              placeholder="Enter Track ID"
              className="w-full p-2 border rounded"
              required
            />
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
              className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm  flex items-center justify-center z-50 p-4">
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
