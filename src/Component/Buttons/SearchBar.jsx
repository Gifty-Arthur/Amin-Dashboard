// src/components/SearchBar.jsx

import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchQuery, setSearchQuery, placeholder }) => {
  return (
    <div className="relative">
      <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="pl-10 pr-4 py-2 border rounded-lg w-full"
      />
    </div>
  );
};

export default SearchBar;
