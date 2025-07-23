// SearchBar.js
import React from "react";
import { CiSearch } from "react-icons/ci"; // Importing CiSearch icon

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative mb-4 mt-4">
      <CiSearch
        size={18}
        className="absolute left-3 mt-1 top-1/3 transform -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Search tracks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
        className="shadow-2xl p-2 mb-4 w-[338px] rounded-[8px] h-[40px] pl-10" // Padding left to avoid overlap with icon
      />
    </div>
  );
};

export default SearchBar;
