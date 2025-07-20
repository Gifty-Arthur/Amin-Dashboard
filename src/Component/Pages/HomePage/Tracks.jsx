import t1 from "../../../assets/Images/home/t1.jpg";
import t2 from "../../../assets/Images/home/t2.jpg";
import t3 from "../../../assets/Images/home/t3.jpg"; // Assuming this path is correct now
import t4 from "../../../assets/Images/home/t4.jpg";

const tracks = [
  {
    image: t1,
    title: "Software Engineering",
    price: "$400",
    duration: "12 weeks",
    tech: ["NodeJS", "ReactJS"],
  },
  {
    image: t2,
    title: "Cloud Computing",
    price: "$350",
    duration: "12 weeks",
    tech: ["Azure", "AWS"],
  },
  {
    image: t3,
    title: "Data Science",
    price: "$400",
    duration: "12 weeks",
    tech: ["Python", "PowerBI"],
  },
  {
    image: t4,
    title: "UI/UX",
    price: "$250",
    duration: "12 weeks",
    tech: ["Figma", "Sketch"],
  },
];

const techColorMap = {
  NodeJS: { bg: "#ebfdf0", text: "#10B981" }, // Very light green background, a vibrant green text
  ReactJS: { bg: "#f2ecfd", text: "#8B5CF6" }, // Very light purple background, a vibrant purple text

  AWS: { bg: "#F0F9FF", text: "#026AA2" },
  Azure: { bg: "F8F9FC", text: "#363F72" },

  Python: { bg: "#F7EDF6", text: "#C11574" },
  PowerBI: { bg: "#E9F3FB", text: "#175CD3" },
  Figma: { bg: "#FFF4ED", text: "#B93815" },
  Sketch: { bg: "#FFF1F3", text: "#C01048" },
};

const Tracks = () => {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">Tracks</h3>
      <div className="grid grid-cols-4 gap-4">
        {tracks.map((track, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md overflow-hidden" // Removed extra space before bg-white
          >
            <div className="relative">
              {/* Image height adjusted to better fit the visual from the first image */}
              <img
                src={track.image}
                alt={track.title}
                className="w-full h-[180px] object-cover rounded-t-lg" // Reverted to rounded-t-lg as 4xl is very aggressive
              />
              {/* Price tag styling adjusted */}
              <span className="absolute top-3 right-3 bg-white bg-opacity-90 px-3 py-1 rounded-[20px] text-sm font-medium">
                {track.price}
              </span>
            </div>
            <div className="p-4">
              {/* Title font size adjusted */}
              <h4 className="font-bold text-lg mb-1">{track.title}</h4>
              <div className="flex items-center text-gray-600 text-sm mb-3">
                {/* Calendar icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{track.duration}</span>
              </div>
              {/* Added padding to the tech section to align with the rest of the content */}
              <div className="flex flex-wrap gap-2 pb-4">
                {track.tech.map((techItem, techIndex) => {
                  const colors = techColorMap[techItem] || {
                    bg: "#F3F4F6", // Default gray background
                    text: "#4B5563", // Default dark gray text
                  };
                  return (
                    <span
                      key={techIndex}
                      style={{
                        backgroundColor: colors.bg,
                        color: colors.text,
                      }}
                      className="w-[82px] h-[28px] rounded-full text-xs font-medium flex items-center justify-center select-none"
                    >
                      {techItem}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracks;
