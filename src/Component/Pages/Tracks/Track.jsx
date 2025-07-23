import React, { useState, useEffect } from "react";
import Title from "../../Titles/titles";
import Subt from "../../Titles/subt";
import Trek from "./Trek";
import SearchBar from "../../Buttons/Searchbar";
import SampleTrack from "../../../../data.json";
import AddTask from "../../Buttons/AddTask";
import { FaPlus } from "react-icons/fa";
import AddNewTrack from "./AddNewTrack"; // Import the new modal component

const Track = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    // Simulate loading data
    setTracks(SampleTrack); // Load your sample tracks
  }, []);

  // Filter tracks based on the search query
  const filteredTracks = tracks.filter((track) =>
    track.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    console.log("New track added:", newTrack); // For demonstration
  };

  return (
    <div className="">
      <Title text="Manage Tracks" />
      <Subt text="Filter, sort, and access detailed tracks" />
      <div className="flex items-center justify-between mt-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />{" "}
        <AddTask
          className="flex items-center justify-center"
          onClick={openModal}
        >
          <FaPlus className="mt-1 mr-1" />
          Add Track
        </AddTask>
      </div>
      <div>
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
