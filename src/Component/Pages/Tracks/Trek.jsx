// src/components/Pages/Tracks/Trek.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { IoPersonOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

import { getAllTracks } from "./TrackService";
import SearchBar from "../../Buttons/Searchbar";
import AddTask from "../../Buttons/AddTask";
import AddNewTrack from "./AddNewTrack";
import Title from "../../Titles/titles";
import Subt from "../../Titles/subt";

const Trek = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddTrack = (newTrack) => {
    setTracks((prevTracks) => [newTrack, ...prevTracks]);
    closeModal();
  };

  const filteredTracks = tracks.filter((track) =>
    track.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between my-4">
        <div className="w-full md:w-1/3 mb-4">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search for a track..."
          />
        </div>
        <AddTask
          onClick={openModal}
          className="flex items-center justify-center gap-2"
        >
          <FaPlus className="" />
          Add Track
        </AddTask>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading tracks...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTracks.length > 0 ? (
            filteredTracks.map((track) => (
              <div
                key={track._id}
                onClick={() => handleTrackClick(track._id)}
                className="group block cursor-pointer h-full"
              >
                {/* ✅ RESTORED CARD JSX */}
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
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {track.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow line-clamp-3">
                      {track.description}
                    </p>
                    <div className="mt-auto flex flex-col text-sm gap-2 pt-2 border-t border-gray-100">
                      <div className="flex items-center">
                        <SlCalender className="mr-2" />
                        <span className="text-gray-600">{track.duration}</span>
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
            <div className="col-span-full text-center text-gray-600 py-10">
              <p>No tracks found.</p>
            </div>
          )}
        </div>
      )}

      <AddNewTrack
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddTrack={handleAddTrack}
      />
    </div>
  );
};

export default Trek;
