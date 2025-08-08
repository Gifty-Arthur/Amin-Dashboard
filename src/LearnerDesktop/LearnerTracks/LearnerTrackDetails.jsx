import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar, FaPlayCircle, FaCertificate } from "react-icons/fa";
import { getTrackById } from "../../Component/Pages/Tracks/TrackService";
import { LuGraduationCap } from "react-icons/lu";
import { MdDateRange } from "react-icons/md";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

// --- Sub-component for the floating details card ---
const DetailsCard = ({ track }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-8">
    <img
      src={track.image}
      alt={track.name}
      className="w-full h-48 object-cover"
    />
    <p className="px-6 border-b mt-4 font-semibold text-lg border-b-[#E6E6E6]">
      Course Details
    </p>
    <div className="p-6">
      <ul className="space-y-3 text-sm text-gray-700">
        <li className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-3">
            {" "}
            <FaPlayCircle /> Duration:
          </span>
          <span>{track.duration}</span>
        </li>
        <li className="flex items-center justify-between gap-3 mt-2">
          <span className="flex items-center gap-3">
            {" "}
            <LuGraduationCap />
            Courses
          </span>
          <span>4</span>
        </li>
        <li className="flex items-center justify-between gap-3 mt-6">
          <span className="flex items-center gap-3">
            {" "}
            <MdDateRange />
            Date
          </span>
          <span>{new Date(track.updatedAt).toLocaleDateString()}</span>
        </li>
      </ul>
      <h2 className="text-3xl font-bold text-center mt-4 ">
        ${track.price}.00
      </h2>

      <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors mt-4">
        Enroll Now
      </button>
    </div>
  </div>
);

const LearnerTrackDetails = () => {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const { trackId } = useParams();

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        if (trackId) {
          const data = await getTrackById(trackId);
          setTrack(data);
        }
      } catch (error) {
        console.error("Failed to fetch track details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrack();
  }, [trackId]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!track) {
    return <div className="text-center py-20">Track not found.</div>;
  }

  // Calculate average rating to display
  const averageRating = track.ratings?.length
    ? (
        track.ratings.reduce((acc, r) => acc + r.rating, 0) /
        track.ratings.length
      ).toFixed(1)
    : 0;

  return (
    <div>
      {/* --- Hero Section --- */}
      <div className="w-full bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex gap-2 text-sm mb-4">
            <Link to="/learner" className="hover:text-blue-200">
              Home
            </Link>
            <span>/</span>
            <Link to="/learner-tracks" className="hover:text-blue-200">
              Tracks
            </Link>
          </div>
          <h1 className="text-4xl font-bold">{track.name}</h1>
          <p className="mt-2 max-w-3xl">{track.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"></div>
          <div className="mt-2 text-sm flex items-center gap-x-4">
            <div>
              <p>Instructor</p>
              <span className="font-bold"> {track.instructor}</span>
            </div>
            <div>
              <p>Enrolled student</p>
              <span className="font-bold">50</span>
            </div>
            <span>
              <span>({track.ratings?.length || 0} ratings)</span>
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(averageRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </span>
          </div>
        </div>
      </div>

      {/* --- Main Content Section --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Placeholder content */}
            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">What you'll learn</h3>
              <ul className="grid grid-cols-1 md:grid-cols gap-4">
                <li className="flex items-start gap-3">
                  <IoCheckmarkCircleSharp className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Cloud architecture principles and best practices.</span>
                </li>
                <li className="flex items-start gap-3">
                  <IoCheckmarkCircleSharp className="text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    Deploying and managing applications in AWS, Azure, and GCP.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <IoCheckmarkCircleSharp className="text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    Infrastructure as Code (Terraform, CloudFormation).{" "}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <IoCheckmarkCircleSharp className="text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    Serverless computing with AWS Lambda, Azure Functions, and
                    Google Cloud Functions.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <IoCheckmarkCircleSharp className="text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    Containerization and orchestration with Docker and
                    Kubernetes.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <IoCheckmarkCircleSharp className="text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    CI/CD pipelines and automation for cloud-based applications.{" "}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="">
            <DetailsCard track={track} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerTrackDetails;
