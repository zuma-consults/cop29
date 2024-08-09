import React from "react";
import { Link } from "react-router-dom";

function Hero({ handleGithubLogin }) {
  return (
    <section
      className="relative flex items-center justify-center flex-col gap-20 h-[92vh] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url("/images/globe.jpg")`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-co-primary opacity-80"></div>

      <div className="relative flex flex-col md:flex-row  justify-between md:pl-20 items-center z-10">
        <div className="text-gray-900 flex flex-col gap-7 justify-center md:p-8 flex-1">
          <h1 className="text-[25px] text-white font-bold leading-tight md:text-[80px] md:font-bold">
            Got Events to attend ?
          </h1>
          <p className="text-lg leading-9 text-white md:w-2/3">
            Access a World of events with Ease: create, book, and manage freely.
            Enjoy Low Fees, High Liquidity, and Expert Support Every Step of the
            Way.
          </p>
          <Link
            to="/events"
            className="text-center w-40 rounded py-3 mx-2 flex justify-center items-center text-white bg-green-800"
          >
            Find Events
          </Link>
        </div>
        <div className="hidden md:flex">
          <img
            src="/images/dots.svg"
            alt="Logo"
            className="rounded-lg w-[80%] h-[80%]"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
