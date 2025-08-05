import React from "react";
import f1 from "../../assets/Leaners/f1.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#01589A] h-[281px] ">
      <div className="border-b-2 border-white ">
        <div className="flex flex-row items-center justify-between p-3 px-20 pt-20">
          <img src={f1} alt="" />
          <div className="flex flex-row gap-10">
            <div>
              <p className="font-semibold text-[20px] text-white">Menu</p>
              <div className="">
                <ul className="flex flex-col gap-4 pt-7 text-sm">
                  <Link
                    to=""
                    className="font-figtree text-white  hover:text-blue-400
                "
                  >
                    Home
                  </Link>
                  <Link
                    to=""
                    className="font-figtree text-white  hover:text-blue-400
                "
                  >
                    Courses
                  </Link>
                </ul>
              </div>
            </div>
            <div>
              <p className="font-semibold text-[20px] text-white">Contact</p>
              <div className="">
                <ul className="flex flex-col gap-4 pt-7 text-sm">
                  <Link
                    to=""
                    className="font-figtree text-white  hover:text-blue-400
              "
                  >
                    +23341002000
                  </Link>
                  <Link
                    to=""
                    className="font-figtree text-white  hover:text-blue-400
              "
                  >
                    New Reisis, Ghana, Accra
                  </Link>
                </ul>
              </div>
            </div>
            {/* social */}
            <div>
              <p className="font-semibold text-[20px] text-white">Social</p>
              <div className="">
                <ul className="flex flex-col gap-4 pt-7 text-sm">
                  <Link
                    to=""
                    className="font-figtree text-white  underline hover:text-blue-400
              "
                  >
                    LinkedIn
                  </Link>
                  <Link
                    to=""
                    className="font-figtree text-white underline hover:text-blue-400
              "
                  >
                    Facebook
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* copyright */}
      <p className="text-white p-4 px-20">
        @copyright 2025 - G-client, All rights reserved
      </p>
    </div>
  );
};

export default Footer;
