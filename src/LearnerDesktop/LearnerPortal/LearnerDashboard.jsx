import React, { useState, useEffect } from "react";
// ✅ IMPORT FROM THE CORRECT SERVICE FILE
import { getMyEnrollments } from "../CheckOut/enrollmentService";
const LearnerDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const data = await getMyEnrollments();
        setEnrollments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch enrollments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  if (loading) return <p>Loading your courses...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Enrolled Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.length > 0 ? (
          enrollments.map((enrollment) => (
            <div
              key={enrollment._id}
              className="bg-white p-4 rounded-lg shadow border"
            >
              <img
                src={enrollment.track?.image}
                alt={enrollment.track?.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="font-bold">{enrollment.track?.name}</h3>
              <p className="text-sm text-gray-500">
                Status:{" "}
                <span className="capitalize font-semibold">
                  {enrollment.status}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p>You are not enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default LearnerDashboard;
