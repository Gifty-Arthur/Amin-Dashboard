import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { IoPersonOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa"; // 1. IMPORT AN ARROW ICON
import { getAllTracks } from "../Tracks/TrackService"; // Adjusted path to be more likely correct

const Treck = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const data = await getAllTracks();
        setTracks(data);
      } catch (error) {
        console.error("Failed to display tracks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, []);

  const handleTrackClick = (trackId) => {
    navigate(`/trackdetails/${trackId}`);
  };

  return (
    <div className="mt-6 max-w-7xl mx-auto">
      {loading ? (
        <div className="text-center text-gray-500">Loading tracks...</div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Recent Tracks</h2>
            <button
              onClick={() => navigate("/track")} // Navigates to your main tracks page
              className="flex items-center gap-2 text-primary hover:underline font-semibold"
            >
              <FaArrowRight />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks && tracks.length > 0 ? (
              tracks.slice(0, 4).map((track) => (
                <div
                  key={track._id}
                  onClick={() => handleTrackClick(track._id)}
                  className="group block cursor-pointer h-full"
                >
                  {/* 4. ADDED FLEXBOX CLASSES FOR EQUAL HEIGHT */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
                    <div className="h-48 relative overflow-hidden flex-shrink-0">
                      {track.image ? (
                        <img
                          src={track.image}
                          alt={track.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="bg-gradient-to-br from-gray-400 to-gray-600 h-full"></div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      {" "}
                      {/* flex-1 makes this div grow */}
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {track.name}
                      </h2>
                      {/* This div is pushed to the bottom */}
                      <div className="mt-auto flex flex-col text-sm gap-2 pt-2 border-t border-gray-100">
                        <div className="flex items-center">
                          <SlCalender className="mr-2" />
                          <span className="text-gray-600">
                            {track.duration}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <IoPersonOutline className="mr-2" />
                          <span className="text-gray-600">
                            {track.instructor}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600">
                No tracks found.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Treck;
