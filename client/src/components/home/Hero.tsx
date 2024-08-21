import React from "react";
import {
  FaCalendarAlt,
  FaPlus,
  FaInfoCircle,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Hero: React.FC = () => {
  return (
    <section
      className="relative flex items-center justify-center flex-col  h-screen md:h-[92vh] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url("/images/globe.jpg")`, // Fix syntax error
      }}
      data-aos="zoom-in-right"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-co-primary opacity-90"></div>

      <div
        className="relative flex flex-col md:flex-row items-center justify-center md:justify-between gap-0 z-10 h-full w-full"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div
          className="text-gray-900 flex flex-col gap-6 md:gap-8 justify-center items-start text-center md:ml-[150px] md:text-left h-full w-2/3"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <h1 className="md:text-[60px] text-[50px] mt-20 md:mt-0 text-white font-bold leading-tight">
            NIGERIA @ COP29
          </h1>
          <p
            className="text-base  leading-7 text-white md:inline"
            style={{ textAlign: "center", width: "100%" }}
          >
            Register for COP29
            {/* , host Side Events and access livestreams from
            Nigeria's COP29 Pavilion */}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-10 md:mt-0">
            <Link
              to="/signup"
              className="text-center w-full lg:w-[40%] rounded py-4 mx-2 flex justify-center items-center text-white bg-green-800 hover:bg-green-700 transition"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <FaCalendarAlt className="text-2xl mr-2" />
              Delegate Registration
            </Link>
            <Link
              to="/create-event"
              // className="text-center w-full md:w-[40%] rounded py-4 mx-2 flex justify-center items-center text-green-800 bg-white hover:bg-green-100 transition"
              className="text-center w-full lg:w-[40%] rounded py-4 mx-2 flex justify-center items-center text-white bg-green-800 hover:bg-green-700 transition"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <FaPlus className="text-2xl mr-2" />
              Book a Slot
            </Link>
            <HashLink
              to="/terms-and-conditions"
              className="text-center w-full lg:w-[40%] rounded py-4 mx-2 flex justify-center items-center text-red-800 hover:bg-red-200 bg-red-100 transition"
            >
              <FaInfoCircle className="text-2xl mr-2" />
              Important Notice
            </HashLink>
            <Link
              to="/faq"
              className="text-center w-full lg:w-[40%] rounded py-4 mx-2 flex justify-center items-center text-blue-800 hover:bg-blue-200  bg-blue-100 transition"
            >
              <FaQuestionCircle className="text-2xl mr-2" />
              Frequently asked Questions
            </Link>
          </div>
        </div>
        <div className="flex md:flex-col items-end justify-center space-y-4 w-full h-full">
          <img
            src="/images/coat.svg" // Replace with the path to your first image
            alt="Nigerai's coat of arm image"
            className="rounded-lg w-2/3  h-[200px] object-contain"
            data-aos="fade-left"
            data-aos-duration="1000"
          />
          <img
            src="/images/cop29.jpeg" // Replace with the path to your second image
            alt="COP 29 image"
            className="rounded-lg w-2/3  h-[200px] object-contain"
            data-aos="fade-left"
            data-aos-duration="1000"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
