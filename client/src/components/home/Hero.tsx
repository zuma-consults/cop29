import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <section
      className="relative flex items-center justify-center flex-col gap-10 md:gap-20 h-screen md:h-[92vh] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url("/images/globe.jpg")`,
      }}
      data-aos="zoom-in-right"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-co-primary opacity-80"></div>

      <div className="relative flex flex-col md:flex-row justify-between md:pl-20 items-center z-10 p-5 md:p-8" data-aos="fade-up" data-aos-duration="1000">
        <div className="text-gray-900 flex flex-col gap-6 md:gap-8 justify-center flex-1 text-center md:text-left" data-aos="fade-right" data-aos-duration="1000">
          <h1 className="text-[20px] md:text-[60px] text-white font-bold leading-tight">
            Got Events to attend?
          </h1>
          <p className="text-base md:text-lg leading-7 text-white md:w-2/3">
            Access a World of events with Ease: create, book, and manage freely.
            Enjoy Low Fees, High Liquidity, and Expert Support Every Step of the
            Way.
          </p>
          <Link
            to="/events"
            className="text-center w-full md:w-40 rounded py-3 mx-2 flex justify-center items-center text-white bg-green-800 hover:bg-green-700 transition"
            data-aos="fade-up" data-aos-duration="1000"
          >
            Find Events
          </Link>
        </div>
        <div className="hidden md:flex flex-1 justify-center">
          <img
            src="/images/dots.svg"
            alt="Logo"
            className="rounded-lg w-[80%] md:w-[60%] h-auto"
            data-aos="fade-left" data-aos-duration="1000"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;