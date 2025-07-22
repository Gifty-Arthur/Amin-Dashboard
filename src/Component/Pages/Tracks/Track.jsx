import React from "react";
import Title from "../../Titles/titles";
import Subt from "../../Titles/subt";
import Trek from "./Trek";

const Track = () => {
  return (
    <div>
      <Title text="Manage Tracks" />
      <Subt text="Filter, sort, and access detailed tracks" />
      <Trek />
    </div>
  );
};

export default Track;
