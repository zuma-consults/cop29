import React from "react";
import { SlSocialTwitter } from "react-icons/sl";
import { FaEnvelope, FaPhone, FaInstagram } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";

function Footer() {
  return (
    <div className="bg-[#162415] w-full h-max py-10 px-6 md:px-10 xl:px-40 flex flex-col items-center">
      <div className="w-full h-max flex flex-col lg:flex-row items-center gap-3 justify-between">
        <div className="w-max h-max flex items-center gap-3">
          <div>
            <img
              src="/images/coat.png"
              alt="Description of image"
              width={80}
              height={10}
              className="rounded-lg"
            />
          </div>
          <div>
            <p className="text-[18px] font-semibold tracking-wide text-white md:w-[100%]">
              COP29 Nigeria
            </p>
          </div>
        </div>
        <div className="text-white">
          <div className="relative text-white">
            <p>Subscribe to our Newsletter</p>
            <div className="relative w-[400px] h-[35px] ">
              <input
                type="text"
                placeholder="Enter your email..."
                className="border-[0.8px] border-gray-400 px-[10px] py-1 mb-2 text-[12px] h-[100%] w-full rounded-none bg-[#333333]"
              />
              <button
                type="button"
                className="absolute top-0 right-0 h-[100%] px-4 bg-[#1B9349] text-black text-[14px] font-semibold rounded-none shadow-md"
                style={{ zIndex: 1 }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-[14px] flex flex-col md:flex-row gap-6 items-center text-[#B3B3B3] justify-between md:w-[80%] lg:w-[60%] pt-5">
        <span>About Us</span>
        <span>Our Initiatives</span>
        <span>Event planning Application</span>
        <span>Contact Us</span>
      </div>

      <div className="underline text-white text-[14px] pt-10">
        COP29 Nigeria Abuja NG
      </div>
      <div className="text-white w-full md:w-[80%] lg:w-[60%] text-[14px] pt-5 flex flex-col md:flex-row justify-center items-center gap-3">
        <div className="w-full flex flex-row flex-wrap text-white text-[14px] gap-6">
          <div className="flex items-center justify-center gap-4">
            <FaEnvelope className="text-white" />
            <span>COP29Nigeria.gov.ng</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone className="text-white" />
            <span>+2347079225464</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="h-[40px] px-4 bg-[#1B9349] text-black text-[14px] font-semibold rounded-none shadow-md"
          >
            <SlSocialTwitter />
          </button>
          <button
            type="button"
            className="h-[40px] px-4 bg-[#1B9349] text-black text-[14px] font-semibold rounded-none shadow-md"
          >
            <AiOutlineFacebook />
          </button>
          <button
            type="button"
            className="h-[40px] px-4 bg-[#1B9349] text-black text-[14px] font-semibold rounded-none shadow-md"
          >
            <FaInstagram />
          </button>
        </div>
      </div>
      <span className="text-[12px] text-gray-600 mt-10">
        ©2024 COP29 Nigeria . All rights reserved.
      </span>
    </div>
  );
}

export default Footer;
