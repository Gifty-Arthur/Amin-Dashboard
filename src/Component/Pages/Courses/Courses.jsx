import React, { useState, useEffect } from "react"; // <-- 1. ADDED useState, useEffect
import { useNavigate } from "react-router-dom";
import Title from "../../Titles/titles";
import Subt from "../../Titles/subt";
import AddTask from "../../Buttons/AddTask";
import SearchBar from "../../Buttons/Searchbar";
import { FaPlus } from "react-icons/fa";
import { getAllCourses } from "./CourseServices";
// import AddNewCourse from "./AddNewCourse"; // You'll need this for the modal

const Courses = () => {
  // --- STATE DEFINITIONS ---
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // <-- 2. ADDED SEARCH STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to display courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // --- EVENT HANDLERS ---
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddCourse = (newCourse) => {
    setCourses((prevCourses) => [newCourse, ...prevCourses]);
    closeModal();
  };

  // --- 3. ADDED FILTERING LOGIC ---
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Title text="Manage Courses" />
      <Subt text="Filter, sort, and access detailed courses" />
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

      <div className="mt-8 bg-white p-4 rounded-lg shadow overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading Courses...</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-4">Course</th>
                <th className="p-4">Track</th>
                <th className="p-4">Date Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course._id} className="border-b hover:bg-gray-50">
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

      {/* <AddNewCourse isOpen={isModalOpen} onClose={closeModal} onAddCourse={handleAddCourse} /> */}
    </div>
  );
};

export default Courses;
