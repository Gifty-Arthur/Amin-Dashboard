import React from "react";
import { useNavigate } from "react-router";
import { SlCalender } from "react-icons/sl";
import { IoPersonOutline } from "react-icons/io5";

const Trek = ({ tracks }) => {
  const navigate = useNavigate();

  const handleTrackClick = (trackId) => {
    navigate(`/trackdetails/${trackId}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tracks.length > 0 ? (
          tracks.map((track) => (
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
                  <div className="flex flex-col text-sm mb-4 gap-2">
                    <div className="flex">
                      <SlCalender className="mt-0.5 mr-1" />
                      <span className="text-gray-600">{track.duration}</span>
                    </div>
                    <div className="flex">
                      <IoPersonOutline className="mt-0.5 mr-1" />
                      <span className="text-gray-600">{track.instructor}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            No tracks found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Trek;
