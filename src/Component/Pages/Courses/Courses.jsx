import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../Titles/titles";
import Subt from "../../Titles/subt";
import AddTask from "../../Buttons/AddTask";
import SearchBar from "../../Buttons/Searchbar";
import { FaPlus } from "react-icons/fa";
import { getAllCourses } from "./CourseServices";
import { LuPencil } from "react-icons/lu"; // ✅ 1. IMPORT ICONS
import { RiDeleteBin6Line } from "react-icons/ri";
// import AddNewCourse from "./AddNewCourse"; // You'll need this for the modal

const Courses = () => {
  // --- STATE DEFINITIONS ---
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10; // You can change this number
  const navigate = useNavigate();

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to display courses:", error);
        setCourses([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // --- FILTERING & PAGINATION LOGIC ---
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // --- EVENT HANDLERS ---
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddCourse = (newCourse) => {
    setCourses((prevCourses) => [newCourse, ...prevCourses]);
    closeModal();
  };

  const handleUpdateClick = (courseId) => {
    console.log("Update course:", courseId);
    // Here you would typically open an update modal
  };

  const handleDeleteClick = (courseId) => {
    console.log("Delete course:", courseId);
    // Here you would typically open a delete confirmation modal
  };

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
          onClick={openModal}
          className="flex items-center justify-center gap-2"
        >
          <FaPlus />
          Add Course
        </AddTask>
      </div>
      <div className="mt-8 bg-white p-4 rounded-xl shadow overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading courses...</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="">
                <th className="p-4">Course</th>
                <th className="p-4">Track</th>
                <th className="p-4">Date Created</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.length > 0 ? (
                currentCourses.map((course) => (
                  <tr
                    key={course._id}
                    className=" 
                     hover:bg-[#F9FBFC]"
                  >
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
                          onClick={() => handleUpdateClick(course._id)}
                          title="Edit Course"
                        >
                          <LuPencil className="text-blue-500 hover:text-blue-700" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(course._id)}
                          title="Delete Course"
                        >
                          <RiDeleteBin6Line className="text-red-500 hover:text-red-700 cursor-pointer" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-8 text-gray-500">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 0 && (
        <div className=" flex justify-between items-center mt-4 ">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border rounded-md disabled:opacity-50 hover:bg-primary cursor-pointer"
          >
            &larr; Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 border rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border rounded-md disabled:opacity-50 hover:bg-primary cursor-pointer"
          >
            Next &rarr;
          </button>
        </div>
      )}
      {/* <AddNewCourse isOpen={isModalOpen} onClose={closeModal} onAddCourse={handleAddCourse} /> */}
    </div>
  );
};

export default Courses;
