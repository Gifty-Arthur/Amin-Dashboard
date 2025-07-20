// src/components/RecentRevenueChart.js
import React, { useState, useEffect, useRef } from "react";

const revenueData = [
  { month: "Jan", values: [1.1, 1.5, 1.1, 1.1] },
  { month: "Feb", values: [1.0, 0.7, 0.3, 1.1] },
  { month: "Mar", values: [1.5, 0.9, 0.6, 1.0] },
  { month: "Apr", values: [1.1, 0.6, 0.4, 0.5] },
  { month: "May", values: [1.0, 0.5, 0.3, 0.9] },
  { month: "Jun", values: [0.9, 0.8, 0.9, 0.8] },
];

const RecentRevenueChart = () => {
  const maxBarHeight = 240;
  const maxValueInThousands = 4.0;
  const chartRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [animatedHeights, setAnimatedHeights] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (chartRef.current) observer.observe(chartRef.current);

    return () => {
      if (chartRef.current) observer.unobserve(chartRef.current);
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      const newHeights = {};
      revenueData.forEach((data) => {
        const totalValue = data.values.reduce((sum, val) => sum + val, 0);
        const barHeightPx = (totalValue / maxValueInThousands) * maxBarHeight;
        newHeights[data.month] = Math.min(barHeightPx, maxBarHeight);
      });
      setAnimatedHeights(newHeights);
    }
  }, [isInView]);

  return (
    <div
      ref={chartRef}
      className="bg-white p-6 rounded-lg shadow-md h-[478px] w-full"
    >
      <h3 className="text-lg font-semibold mb-4 border-b border-gray-200 pb-2 text-gray-800">
        Recent Revenue
      </h3>

      <div className="flex items-end justify-between h-64 px-6">
        <div className="flex flex-col-reverse justify-between h-full text-sm text-gray-500 mr-2">
          <span>0</span>
          <span>1k</span>
          <span>2k</span>
          <span>3k</span>
        </div>

        <div className="flex-1 flex justify-between items-end h-full relative">
          {revenueData.map((data) => {
            const totalValue = data.values.reduce((sum, val) => sum + val, 0);
            const currentBarHeight = animatedHeights[data.month] || 0;

            return (
              <div
                key={data.month}
                className="flex flex-col-reverse w-10 rounded-t-lg overflow-hidden transition-all duration-700 ease-out"
                style={{ height: `${currentBarHeight}px` }}
              >
                {data.values.map((segmentValue, segIndex) => {
                  const segmentHeightPx =
                    (segmentValue / totalValue) * currentBarHeight;
                  const segmentColorClass = [
                    "bg-blue-300",
                    "bg-blue-400",
                    "bg-blue-500",
                    "bg-blue-600",
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

      <div className="flex justify-between mt-4 text-sm text-gray-500 px-6">
        {revenueData.map((data) => (
          <span key={data.month} className="w-10 text-center">
            {data.month}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecentRevenueChart;
