import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { getAllTracks } from "../../Component/Pages/Tracks/TrackService";

const TrackCard = ({ track }) => {
  const navigate = useNavigate();

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((acc, r) => acc + r.rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  const averageRating = calculateAverageRating(track.ratings);

  const handleNavigation = (e) => {
    e.stopPropagation();
    navigate(`/learner/tracks/${track._id}`);
  };

  return (
    <div
      onClick={handleNavigation}
      className="bg-white p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:shadow-xl transition-shadow flex flex-col"
    >
      <img
        src={track.image}
        alt={track.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <div className="flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-gray-800">{track.name}</h3>
        <p className="text-sm text-gray-600 my-2 line-clamp-3 flex-grow">
          {track.description}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <div className="flex items-center text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.floor(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-sm font-semibold">{averageRating}</span>
        </div>

        <button
          onClick={handleNavigation}
          className="w-full mt-4 py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Preview Course
        </button>
      </div>
    </div>
  );
};

const LearnerTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const data = await getAllTracks();
        setTracks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to display tracks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, []);

  return (
    <div>
      <div className="w-full bg-primary h-[135px] flex flex-col items-center justify-center">
        <h1 className="font-semibold text-white text-3xl">Tracks</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-semibold text-tert text-2xl mb-6">Top Tracks</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading tracks...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracks.map((track) => (
              <TrackCard key={track._id} track={track} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnerTracks;
