import React from "react";
import bg1 from "../../assets/Leaners/bg1.png";
import OurSolution from "./OurSolution";
import HomeTitles from "../Title/HomeTitles";
import h2 from "../../assets/Leaners/h2.png";
import TechBadge from "../Title/TechBadge";
import p1 from "../../assets/Leaners/p1.png";
import p2 from "../../assets/Leaners/p2.png";
import p3 from "../../assets/Leaners/p3.png";
import { useState, useEffect, useRef } from "react";

const LearnerMain = () => {
  const [count, setCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef(null); // Ref to attach to the element you want to watch

  useEffect(() => {
    // Stop if the animation has already run or the element isn't ready
    if (!ref.current || hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is in view and animation hasn't run
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true); // Mark as triggered so it won't run again

          let start = 0;
          const end = 4; // The number you want to count up to
          const duration = 1900; // Animation duration in milliseconds
          const startTime = Date.now();

          const step = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const currentCount = Math.floor(progress * end);
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(step);
          observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasTriggered]); // Dependency array
  return (
    <div>
      <div className="relative -mt-4">
        <img src={bg1} alt="" className="w-full object-contain" />

        {/* This div positions the text over the image */}
        <div className="absolute inset-0 pt-30 px-20">
          <div>
            <h1 className="text-white text-3xl font-bold mt-10">
              Unlock Your Potential with
              <br /> Industry-Leading Courses!
            </h1>
            <p className="text-md text-white font-Figtree  mt-4">
              "Join thousands of learners gaining real-
              <br />
              world skills and advancing their careers. Our
              <br /> expert-led courses are designed to empower <br />
              you to succeed."
            </p>
            <button className="md:w-[137px] w-full h-[48px] font-semibold hover:text-primary  mt-4 bg-primary rounded-sm text-white hover:bg-[#E6EFF5] cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <OurSolution />
      {/* what will be next */}
      <div className="h-[447px] bg-primary   mt-20">
        <div className="flex items-center justify-between">
          <div className="mt-6 px-4 sm:px-6 lg:px-20 text-white ">
            <h1 className="text-3xl font-bold text-white">
              What will be next?
            </h1>
            <p className="text-md mt-2">
              Discover our diverse stack of solutions, including software
              <br />
              development, data science, and cloud tools. Sign up today and
              <br />
              kickstart your journey!
            </p>
            {/* courses */}
            <div className="mt-8  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <TechBadge name="React Js" borderColor="white" />
              <TechBadge name="Next Js" borderColor="#28A3E2" />
              <TechBadge name="Node Js" borderColor="#70C053" />
              <TechBadge name="Django" borderColor="#A61D24" />
            </div>
            <div className="mt-8  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <TechBadge name="Mongo DB" borderColor="#D89614" />
              <TechBadge name="Vue Js" borderColor="#D89614" />
              <TechBadge name="AWS" borderColor="#999999" />
              <TechBadge name="Azure" borderColor="#999999" />
            </div>
            <div className="mt-8  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <TechBadge name="PowerBI" borderColor="white" />
              <TechBadge name="Python" borderColor="#28A3E2" />
              <TechBadge name="Excel" borderColor="#70C053" />
              <TechBadge name="Tableau" borderColor="#A61D24" />
            </div>
          </div>
          {/* image */}
          <img src={h2} alt="" className="mt-8" />
        </div>
      </div>

      {/* we are pround */}
      <div className="flex flex-col items-center text-center mt-10">
        <HomeTitles text="We are proud" />
        <h2 className="text-md font-light text-black">
          We take pride in our achievements and commitment to excellence. Join
          us in celebrating innovation, growth, and success.
        </h2>
      </div>
      <div ref={ref} className="mt-6 px-4 sm:px-6 lg:px-20">
        <div>
          <img src={p1} alt="" />
          <h1 className="text-2xl text-primary font-bold ml-5 ">{count}+</h1>
        </div>
        <p className="text-sm font-bold ml-2">Courses</p>
      </div>
    </div>
  );
};

export default LearnerMain;
