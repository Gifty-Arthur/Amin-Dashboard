import React, { useEffect, useState } from "react";

const Trek = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data matching your API structure for development
  const sampleTracks = [
    {
      _id: "67fd04e1db1ad84c0687b468",
      name: "Cloud Computing Expertise",
      price: 350,
      instructor: "John Doe",
      duration: "12 weeks",
      image:
        "https://res.cloudinary.com/techbiznez/image/upload/v1748593248/image-1748593247833-504326900_sjbbvu.jpg",
      description:
        "Unlock your potential with comprehensive training in modern software development. Become a Full-Stack Web Developer with a single comprehensive course covering HTML, CSS, JavaScript, Node, React, PostgreSQL, Web3, and apps.",
      courses: [
        { _id: "67fd0554db1ad84c0687b46d", title: "AWS Cloud Practional" },
      ],
      ratings: [],
    },
    {
      _id: "6829efe117460c2f2264a134",
      name: "Data Science Mystery",
      price: 350,
      instructor: "Tibebe Solomon",
      duration: "12 weeks",
      image:
        "https://res.cloudinary.com/techbiznez/image/upload/v1747578849/image-1747578842538-279969083_cmlhjq.jpg",
      description:
        "Equip yourself with the skills to analyze, interpret, and leverage data, becoming an expert.",
      courses: [
        { _id: "6829f4e117460c2f2264a15b", title: "Data Visualization" },
      ],
      ratings: [],
    },
    {
      _id: "6829f1d317460c2f2264a148",
      name: "Software Development",
      price: 400,
      instructor: "Melake Wubshet",
      duration: "12 weeks",
      image:
        "https://res.cloudinary.com/techbiznez/image/upload/v1747579347/image-1747579345670-653710284_gr6njf.jpg",
      description:
        "Equip yourself with the skills to analyze, interpret, and leverage data, becoming an expert.",
      courses: [
        {
          _id: "6829f61117460c2f2264a162",
          title:
            "Developing Web Applications and Web APIs Protected by Azure Active Directory",
        },
      ],
      ratings: [],
    },
    {
      _id: "683077f617460c2f22653b2d",
      name: "UI/UX Design",
      price: 3500,
      instructor: "Teshome M.",
      duration: "12 week",
      image:
        "https://res.cloudinary.com/techbiznez/image/upload/v1748345763/image-1748345762878-941638165_oghyws.jpg",
      description:
        "Unlock your potential with comprehensive training in modern software development. Become a Full-Stack Web Developer with a single comprehensive course covering HTML, CSS, JavaScript, Node, React, PostgreSQL, Web3, and DApps.",
      courses: [],
      ratings: [],
    },
  ];

  useEffect(() => {
    // For development: using sample data to avoid CORS issues
    // Replace this with actual API call once CORS is configured

    setTimeout(() => {
      setTracks(sampleTracks);
      setLoading(false);
    }, 1000);

    // Uncomment this when CORS is fixed:
    /*
    const apiUrl = 'https://cors-anywhere.herokuapp.com/https://tmp-se-projectapi.azurewebsites.net/api/tracks';
    
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.tracks) {
          setTracks(data.tracks);
        } else {
          setTracks([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tracks:", err);
        setError(err.message);
        setLoading(false);
      });
    */
  }, []);

  const handleTrackClick = (trackId) => {
    // Replace this with your actual navigation logic
    console.log(`Navigate to track: ${trackId}`);
    // For React Router: navigate(`/track/${trackId}`);
  };

  const LoadingCard = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
        </div>
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

  const getGradientClass = (index) => {
    const gradients = [
      "from-teal-400 to-teal-600",
      "from-orange-400 to-orange-600",
      "from-blue-400 to-blue-600",
      "from-gray-400 to-gray-600",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tracks.map((track, index) => (
          <div
            key={track._id}
            onClick={() => handleTrackClick(track._id)}
            className="group block cursor-pointer"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group-hover:border-gray-200">
              {/* Header Image */}
              <div className="h-48 relative overflow-hidden">
                {track.image ? (
                  <img
                    src={track.image}
                    alt={track.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className={`bg-gradient-to-br ${getGradientClass(
                      index
                    )} flex items-center justify-center h-full`}
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Price Tag */}
                {track.price && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      ${track.price}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {track.name}
                </h2>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {track.description?.slice(0, 100)}...
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  {track.duration && (
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{track.duration}</span>
                    </div>
                  )}

                  {track.instructor && (
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>{track.instructor}</span>
                    </div>
                  )}
                </div>

                {/* Technologies/Courses */}
                {track.courses && track.courses.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <div className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-xs font-medium">
                      {track.courses.length} Course
                      {track.courses.length !== 1 ? "s" : ""}
                    </div>
                    {track.ratings && track.ratings.length > 0 && (
                      <div className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-md text-xs font-medium flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        {track.ratings.length} Review
                        {track.ratings.length !== 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trek;
