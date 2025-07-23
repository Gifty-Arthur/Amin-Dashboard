import React, { useState, useEffect } from "react";
import Title from "../../Titles/titles";
import Subt from "../../Titles/subt";
import Trek from "./Trek";
import SearchBar from "../../Buttons/Searchbar";
import AddTask from "../../Buttons/AddTask";
import { FaPlus } from "react-icons/fa";
import AddNewTrack from "./AddNewTrack";

// Change this component to accept 'fetchedTracks' as a prop
const Track = ({ fetchedTracks }) => {
  // fetchedTracks will be an empty array initially from TrackListContainer
  // Initialize 'tracks' with an empty array or the fetchedTracks if available
  const [tracks, setTracks] = useState(fetchedTracks || []); // <--- KEY CHANGE HERE
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use useEffect to update 'tracks' state if 'fetchedTracks' prop changes
  useEffect(() => {
    // Only update if fetchedTracks is not null/undefined
    if (fetchedTracks) {
      // <--- Added a check here for robustness
      setTracks(fetchedTracks);
    }
  }, [fetchedTracks]); // Re-run effect if fetchedTracks prop changes

  // Filter tracks based on the search query
  // Ensure 'tracks' is an array before calling filter
  const filteredTracks = Array.isArray(tracks)
    ? tracks.filter((track) =>
        track.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []; // <--- Another KEY CHANGE: Defensive check

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle adding a new track
  const handleAddTrack = (newTrack) => {
    setTracks((prevTracks) => [...prevTracks, newTrack]);
    console.log("New track added:", newTrack);
  };

  return (
    <div className="">
      <Title text="Manage Tracks" />
      <Subt text="Filter, sort, and access detailed tracks" />
      <div className="flex items-center justify-between mt-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <AddTask
          className="flex items-center justify-center"
          onClick={openModal}
        >
          <FaPlus className="mt-1 mr-1" />
          Add Track
        </AddTask>
      </div>
      <div>
        {/* Pass filteredTracks to Trek */}
        <Trek tracks={filteredTracks} />
      </div>

      {/* Render the AddNewTrack modal */}
      <AddNewTrack
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddTrack={handleAddTrack} // Pass the function to add a new track
      />
    </div>
  );
};

export default Track;
