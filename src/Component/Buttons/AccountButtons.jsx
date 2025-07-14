import React from "react";

const AccountButtons = ({ onClick, className = "", children }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full h-[48px] cursor-pointer  text-white bg-primary font-semibold font-roboto text-[18px] transition duration-300 hover:bg-blue-300 rounded-[8px] ${className}`}
    >
      {children}
    </button>
  );
};

export default AccountButtons;
