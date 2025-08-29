import React from "react";
import bg1 from "../../assets/Leaners/bg1.png";
import { useNavigate } from "react-router";
import OurSolution from "./OurSolution";
import HomeTitles from "../Title/HomeTitles";
import h2 from "../../assets/Leaners/h2.png";
import TechBadge from "../Title/TechBadge";
import p1 from "../../assets/Leaners/p1.png";
import p2 from "../../assets/Leaners/p2.png";
import p3 from "../../assets/Leaners/p3.png";
import { useState, useEffect, useRef } from "react";
import bg2 from "../../assets/Leaners/bg2.png";
import { TbLogin2 } from "react-icons/tb";
import s1 from "../../assets/Leaners/s1.png";
import s2 from "../../assets/Leaners/s2.png";
import c1 from "../../assets/Leaners/c1.png";
import c2 from "../../assets/Leaners/c2.png";
import c3 from "../../assets/Images/Account/c3.png";
import { CiGrid31 } from "react-icons/ci";

const LearnerMain = () => {
  const [count, setCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ref.current || hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true); // Mark as triggered so it won't run again

          let start = 0;
          const end = 4;
          const duration = 1900;
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
  }, [hasTriggered]);

  const handleGetStarted = () => {
    navigate("/learner-tracks");
  };
  return (
    <div>
      <div className="relative -mt-4">
        <img src={bg1} alt="" className="w-full object-contain" />

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
            <button
              onClick={handleGetStarted}
              className="md:w-[137px] w-full h-[48px] font-semibold hover:text-primary  mt-4 bg-primary rounded-sm text-white hover:bg-[#E6EFF5] cursor-pointer"
            >
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
          <img src={h2} alt="" className="mt-8 px-4 sm:px-6 lg:px-20" />
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
      <div ref={ref} className="mt-6 flex flex-row items-center justify-evenly">
        <div>
          <img src={p1} alt="" />
          <h1 className="text-2xl text-primary font-bold ml-5 ">{count}+</h1>
          <p className="text-sm font-bold ml-2">Courses</p>
        </div>
        <div>
          <img src={p2} alt="" />
          <h1 className="text-2xl text-primary font-bold ">200+</h1>
          <p className="text-sm font-bold ">Course student</p>
        </div>
        <div>
          <img src={p3} alt="" />
          <h1 className="text-2xl text-primary font-bold ml-2 ">250+</h1>
          <p className="text-sm font-bold ">Hours content</p>
        </div>
      </div>
      {/* time to invest */}
      <div className="mt-20 relative">
        <img src={bg2} alt="" className="" />
        <div className="absolute inset-0  px-20 flex flex-row items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold">
              It's time to start investing in yourself
            </h1>
            <p className="text-white  text-sm  mt-4">
              Online courses open the opportunity for learning to almost anyone,
              regardless of their scheduling <br />
              commitments.
            </p>
          </div>
          <button className="md:w-[137px]  border-white border-2 w-full h-[48px] font-semibold hover:text-primary  mt-4 bg-primary rounded-sm text-white hover:bg-[#E6EFF5] cursor-pointer">
            Get Started
          </button>
        </div>
      </div>

      {/* choose your Course */}
      <div className=" px-20 mt-20">
        <div className="flex flex-row items-center justify-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="md:w-[508px] w-full h-[152px] rounded-lg mt-4 flex items-center justify-center  shadow-2xl bg-white">
              <div className="flex flex-row items-center gap-10">
                <TbLogin2 size={48} className=" text-primary " />
                <div>
                  <h1 className="text-black text-2xl font-bold">Onboarding </h1>
                  <p>
                    Get started seamlessly with a smooth onboarding <br />
                    experience. Learn the essentials and set yourself <br />
                    up for success from day one.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-[508px] w-full h-[152px]  rounded-lg flex items-center justify-center  shadow-2xl bg-white">
              <div className="flex flex-row items-center gap-10">
                <TbLogin2 size={48} className=" text-primary " />
                <div>
                  <h1 className="text-black text-2xl font-bold">
                    Start Learning{" "}
                  </h1>
                  <p>
                    Start your learning journey with practical, hands-
                    <br />
                    on experience. Develop the skills needed to build
                    <br /> implement, and manage effective solutions.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-[508px] w-full h-[152px]  rounded-lg flex items-center justify-center  shadow-2xl bg-white">
              <div className="flex flex-row items-center gap-10">
                <TbLogin2 size={48} className=" text-primary " />
                <div>
                  <h1 className="text-black text-2xl font-bold">
                    Start Learning{" "}
                  </h1>
                  <p>
                    Start your learning journey with practical, hands-
                    <br />
                    on experience. Develop the skills needed to build
                    <br /> implement, and manage effective solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* lo */}
          <div className="rounded-md w-[508px] h-[516px] shadow-2xl bg-white mt-6  mb-10 ">
            <div className="flex flex-row items-center justify-between p-4">
              <div>
                <p className="text-center font-medium ">1</p>
                <p className="text-md font-medium text-center">Secure Login</p>
                <img src={s1} alt="" className="mt-6" />
              </div>
              <div>
                <p className="text-center font-medium">2</p>
                <p className="text-md font-medium">Authentication</p>
                <img src={s2} alt="" className="mt-6" />
              </div>
            </div>

            {/* 3 */}
            <div>
              <p className=" font-medium p-4 text-center ">3</p>
              <p className="text-md font-medium text-center ">
                Choose a Course
              </p>
              <div className="flex flex-row items-center justify-center gap-6 mt-8 px-3">
                <div className=" md:w-[127px] h-[120px] bg-white shadow-2xl rounded-md px-4 ">
                  <img src={c1} alt="" className="w-[31px] h-[31px]" />
                  <h1 className="text-[8px] font-bold mt-1 ">
                    Software Developmet
                  </h1>
                  <p className="text-[7px] mt-1">
                    Unlock your potential with comprehensive training in modern
                    software development
                  </p>
                  <p className="font-bold text-sm">Price: $350</p>
                </div>
                <div className=" md:w-[127px] h-[120px] bg-white shadow-2xl rounded-md px-4 ">
                  <img src={c3} alt="" className="w-[31px] h-[31px]" />
                  <h1 className="text-[8px] font-bold mt-1 ">
                    Cloud Computing
                  </h1>
                  <p className="text-[7px] mt-1">
                    Gain hands-on experience in cloud architecture, preparing
                    you to manage scalable solutions.
                  </p>
                  <p className="font-bold text-sm">Price: $350</p>
                </div>
                <div className=" md:w-[127px] h-[120px] bg-white shadow-2xl rounded-md px-4 ">
                  <img src={c2} alt="" className="w-[31px] h-[31px]" />
                  <h1 className="text-[8px] font-bold mt-1 ">Data Science</h1>
                  <p className="text-[7px] mt-1">
                    Gain hands-on experience in cloud architecture, preparing
                    you to manage scalable solutions.
                  </p>
                  <p className="font-bold text-sm">Price: $350</p>
                </div>

                {/* data science */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerMain;
