// src/components/RecentRevenueChart.js
import React, { useState, useEffect, useRef } from "react";

const revenueData = [
  { month: "Jan", values: [1.1, 1.5, 1.1, 1.1] }, // Total 4.8k
  { month: "Feb", values: [1.0, 0.7, 0.3, 1.1] }, // Total 3.1k
  { month: "Mar", values: [1.5, 0.9, 0.6, 1.0] }, // Total 4.0k
  { month: "Apr", values: [1.1, 0.6, 0.4, 0.5] }, // Total 2.6k
  { month: "May", values: [1.0, 0.5, 0.3, 0.9] }, // Total 2.7k
  { month: "Jun", values: [0.9, 0.8, 0.9, 0.8] }, // Total 2.3k
];

const RecentRevenueChart = () => {
  const maxBarHeight = 314;
  const maxValueInThousands = 3.5;

  // Ref to observe the chart container
  const chartRef = useRef(null);
  // State to track if the chart is in view
  const [isInView, setIsInView] = useState(false);
  // State to control the animated height
  const [animatedHeights, setAnimatedHeights] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true); // Chart is in view, trigger animation
            observer.unobserve(entry.target); // Stop observing once animated (optional: if you want it to animate only once)
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the target is visible
      }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []); // Empty dependency array, runs once on mount

  useEffect(() => {
    if (isInView) {
      // If chart is in view, calculate and set the final heights
      const newHeights = {};
      revenueData.forEach((data) => {
        const totalValue = data.values.reduce((sum, val) => sum + val, 0);
        const barHeightPx = (totalValue / maxValueInThousands) * maxBarHeight;
        newHeights[data.month] = Math.min(barHeightPx, maxBarHeight);
      });
      setAnimatedHeights(newHeights);
    } else {
      // Optionally reset heights to 0 if it goes out of view and you want to re-animate on scroll back
      // setAnimatedHeights({}); // Uncomment this if you want it to re-animate every time it comes into view
    }
  }, [isInView]); // This effect runs when isInView changes

  return (
    // Attach the ref to the main chart container
    <div ref={chartRef} className="bg-white [487px] p-6 rounded-lg  shadow-md">
      <h3 className="text-xl border-b font-semibold mb-20 border-b-gray-200  text-tert">
        Recent Revenue
      </h3>

      <div className="flex items-end justify-between h-72 px-4">
        {/* Y-axis labels */}
        <div className="flex flex-col-reverse justify-between h-full text-sm text-gray-500 ">
          <span>0</span>
          <span>1k</span>
          <span>2k</span>
          <span>3k</span>
        </div>

        {/* Bars */}
        <div className="flex-1 flex justify-around items-end h-full relative">
          {revenueData.map((data, index) => {
            const totalValue = data.values.reduce((sum, val) => sum + val, 0);
            const currentBarHeight = animatedHeights[data.month] || 0;

            return (
              <div
                key={data.month}
                className="flex flex-col-reverse w-12 rounded-t-2xl overflow-hidden transition-all duration-700 ease-out" // Added transition
                style={{ height: `${currentBarHeight}px` }}
              >
                {data.values.map((segmentValue, segIndex) => {
                  // Calculate segment height based on the animated currentBarHeight
                  const segmentHeightPx =
                    (segmentValue / totalValue) * currentBarHeight;
                  const segmentColorClass = [
                    "bg-blue-300", // Lightest blue
                    "bg-blue-400",
                    "bg-blue-500",
                    "bg-blue-600", // Darkest blue
                  ][segIndex];

                  return (
                    <div
                      key={segIndex}
                      className={`${segmentColorClass} w-full`}
                      style={{ height: `${segmentHeightPx}px` }}
                    ></div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-around mt-2 text-sm text-gray-500 ml-12">
        {revenueData.map((data) => (
          <span key={data.month} className="w-12 text-center">
            {data.month}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecentRevenueChart;
