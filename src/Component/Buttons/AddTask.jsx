import React from "react";

const AddTask = ({ onClick, className = "", children }) => {
  return (
    <button
      onClick={onClick}
      className={`w-[233px] h-[44px] rounded-lg border-2 bg-primary hover:bg-blue-400 text-white font-figtree text-[20px] flex items-center] font-semiboldb ${className}`}
    >
      {children}
    </button>
  );
};

export default AddTask;
