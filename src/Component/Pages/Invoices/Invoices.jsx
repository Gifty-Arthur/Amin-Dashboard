// src/Component/Pages/Invoices.js
import AddTask from "../../Buttons/AddTask";
import SearchBar from "../../Buttons/Searchbar";
import React, { useState } from "react";

const Invoices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <div className="text-tert  text-[24px] font-semibold font-figtree  p-5">
        <h1>Manage invoices</h1>
        <p className="text-[18px] text-[#7F7E83] font-light">
          Filter, sort, and access detailed invoices{" "}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search for an invoice..."
        />
        <AddTask>Add Invoice</AddTask>
      </div>
    </div>
  );
};

export default Invoices;
