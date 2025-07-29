import React from "react";
import AddTask from "../../Buttons/AddTask";
import SearchBar from "../../Buttons/Searchbar";
import Title from "../../Titles/titles";
import Subt from "../../Titles/subt";

const Learners = () => {
  return (
    <div>
      <div className="">
        <Title text="Manage Learners" />
        <Subt text="Filter, sort, and access detailed learners" />
      </div>
      <div className="flex items-end justify-end">
        <SearchBar placeholder="Search by name..." />
      </div>
    </div>
  );
};

export default Learners;
