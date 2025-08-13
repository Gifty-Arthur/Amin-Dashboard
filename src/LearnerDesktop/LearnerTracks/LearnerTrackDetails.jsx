import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStar, FaPlayCircle, FaCertificate } from "react-icons/fa";
import {
  getTrackById,
  getAllTracks,
} from "../../Component/Pages/Tracks/TrackService";
import { LuGraduationCap } from "react-icons/lu";
import { MdDateRange } from "react-icons/md";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

// --- Sub-component for the floating details card ---
const DetailsCard = ({ track }) => {
  const navigate = useNavigate();
  const handleEnrollClick = () => {
    navigate(`/checkout/${track._id}`);
  };

  return (
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
              <FaPlayCircle /> Duration:
            </span>
            <span>{track.duration}</span>
          </li>
          <li className="flex items-center justify-between gap-3 mt-2">
            <span className="flex items-center gap-3">
              <LuGraduationCap /> Courses
            </span>
            <span>{track.courses?.length || 0}</span>
          </li>
          <li className="flex items-center justify-between gap-3 mt-6">
            <span className="flex items-center gap-3">
              <MdDateRange /> Date
            </span>
            <span>{new Date(track.updatedAt).toLocaleDateString()}</span>
          </li>
        </ul>
        <h2 className="text-3xl font-bold text-center mt-4">${track.price}</h2>
        <button
          onClick={handleEnrollClick}
          className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors mt-4"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

// --- Sub-component for the related track cards ---
const TrackCard = ({ track }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/learner-track-details/${track._id}`)}
      className="group block cursor-pointer h-full"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
        <div className="h-48 relative overflow-hidden flex-shrink-0">
          <img
            src={track.image}
            alt={track.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-bold text-lg text-gray-800">{track.name}</h3>
          <p className="text-gray-600 text-sm mt-2 leading-relaxed flex-grow line-clamp-3">
            {track.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const LearnerTrackDetails = () => {
  const [track, setTrack] = useState(null);
  const [allTracks, setAllTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { trackId } = useParams();

  useEffect(() => {
    const fetchTrackData = async () => {
      try {
        setLoading(true);
        setTrack(null);
        if (trackId) {
          const singleTrackData = await getTrackById(trackId);
          setTrack(singleTrackData);
        }
        const allTracksData = await getAllTracks();
        setAllTracks(Array.isArray(allTracksData) ? allTracksData : []);
      } catch (error) {
        console.error("Failed to fetch track data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrackData();
  }, [trackId]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!track) return <div className="text-center py-20">Track not found.</div>;

  const relatedTracks = allTracks
    .filter((t) => t._id !== track._id)
    .slice(0, 4);
  const averageRating = track.ratings?.length
    ? (
        track.ratings.reduce((acc, r) => acc + r.rating, 0) /
        track.ratings.length
      ).toFixed(1)
    : 0;

  return (
    <div>
      <div className="w-full bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="mt-4 flex flex-wrap items-center gap-10 gap-y-2 text-sm">
            <div className="mt-2 text-sm flex items-center gap-10">
              <div className="flex flex-col">
                <span>Created by </span>
                <span className="font-semibold">{track.instructor}</span>
              </div>
              <div>
                {" "}
                <div className="flex flex-col">
                  <span>Enrolled student</span>
                  <span className="font-semibold">50</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col ">
              <span className="font-bold">{averageRating}</span>
              <div className="flex items-center text-yellow-400   mt-1">
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
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">What you'll learn</h3> {" "}
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
                    Infrastructure as Code (Terraform, CloudFormation).
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <IoCheckmarkCircleSharp className="text-green-500 mt-1 flex-shrink-0" />

                  <span>
                    computing with AWS Lambda, Azure Functions, and Google Cloud
                    Functions.
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
                    CI/CD pipelines and automation for cloud-based applications.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <DetailsCard track={track} />
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Explore Related Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedTracks.map((relatedTrack) => (
              <TrackCard key={relatedTrack._id} track={relatedTrack} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerTrackDetails;
