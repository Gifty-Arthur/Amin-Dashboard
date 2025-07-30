import React from "react";

const TechBadge = ({ name, borderColor }) => {
  // Use Tailwind's arbitrary value syntax to apply the dynamic border color
  const borderStyle = {
    borderColor: borderColor,
  };

  return (
    <div
      style={borderStyle}
      className="w-[111px] h-[48px] flex items-center justify-center border-2 rounded-md"
    >
      {name}
    </div>
  );
};

export default TechBadge;
