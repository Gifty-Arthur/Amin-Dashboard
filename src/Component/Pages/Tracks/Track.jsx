import React, { useState, useEffect } from "react";
import Title from "../../Titles/titles";
import Subt from "../../Titles/subt";
import Trek from "./Trek";
// import SearchBar from "../../Buttons/Searchbar";
// import AddTask from "../../Buttons/AddTask";
// import { FaPlus } from "react-icons/fa";
import AddNewTrack from "./AddNewTrack";

// Change this component to accept 'fetchedTracks' as a prop
const Track = ({ fetchedTracks }) => {
  // Initialize 'tracks' state. Crucially, ensure it's always an array.
  // If fetchedTracks is initially undefined/null, it defaults to an empty array.
  const [tracks, setTracks] = useState(fetchedTracks || []); // <-- Key Change 1: Defensive initialization
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (fetchedTracks) {
      setTracks(fetchedTracks);
    }
  }, [fetchedTracks]); // Re-run this effect when fetchedTracks prop changes

  const filteredTracks = Array.isArray(tracks) // <-- Key Change 2: Defensive check before filtering
    ? tracks.filter((track) =>
        track.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []; // If tracks isn't an array, default to an empty array for filtering

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
      <div className="flex items-center justify-between mt-4"></div>
      <div>
        {/* Pass filteredTracks to Trek */}
        <Trek tracks={filteredTracks} />
      </div>

      {/* Render the AddNewTrack modal */}
      <AddNewTrack
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddTrack={handleAddTrack}
      />
    </div>
  );
};

export default Track;
