import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SampleTrack from "../../../../data.json";
import { SlCalender } from "react-icons/sl";
import { IoPersonOutline } from "react-icons/io5";

const Trek = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setTracks(SampleTrack);
      setLoading(false);
    }, 1000);
  }, []);

  const handleTrackClick = (trackId) => {
    navigate(`/trackdetails/${trackId}`);
  };

  const techColorMap = {
    AWS: { bg: "#F0F9FF", text: "#026AA2" },
    Azure: { bg: "#F8F9FC", text: "#363F72" },
    Python: { bg: "#F7EDF6", text: "#C11574" },
    PowerBI: { bg: "#E9F3FB", text: "#175CD3" },
    NodeJS: { bg: "#ebfdf0", text: "#10B981" },
    ReactJS: { bg: "#f2ecfd", text: "#9478d7" },
    Figma: { bg: "#FFF4ED", text: "#B93815" },
    Sketch: { bg: "#FFF1F3", text: "#C01048" },
  };

  const LoadingCard = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-red-600">Error loading tracks: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tracks.map((track) => (
          <div
            key={track._id}
            onClick={() => handleTrackClick(track._id)}
            className="group block cursor-pointer"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group-hover:border-gray-200">
              <div className="h-48 relative overflow-hidden">
                {track.image ? (
                  <img
                    src={track.image}
                    alt={track.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center h-full">
                    {/* Placeholder for image */}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {track.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {track.description}
                </p>
                <div className="flex flex-col text-sm  mb-4 gap-2">
                  <div className="flex ">
                    <SlCalender className="mt-0.5 mr-1" />
                    <span className="text-gray-600">{track.duration}</span>
                  </div>
                  <div className="flex">
                    {" "}
                    <IoPersonOutline className="mt-0.5 mr-1" />
                    <span className="text-gray-600">{track.instructor}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pb-4">
                  {track.tech.map((techItem, techIndex) => {
                    console.log(techItem); // Log the tech item
                    const colors = techColorMap[techItem] || {
                      bg: "#F3F4F6", // Default gray background
                      text: "#4B5563", // Default dark gray text
                    };
                    console.log(colors); // Log the colors object

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trek;
