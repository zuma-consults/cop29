import React from "react";
import { FaCalendarAlt, FaInfoCircle, FaQuestionCircle } from "react-icons/fa";
import { AiOutlineFolderView } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import CountdownTimer from "../ui/CountDown";
import { HashLink } from "react-router-hash-link";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const handleOpenPDF = () => {
    const pdfUrl = "/images/overview.pdf"; // Replace with the actual PDF URL
    window.open(pdfUrl, "_blank");
  };

  const handleNavigate = (type: string) => {
    if (type === "delegates") {
      localStorage.setItem("accreditationType", "delegates");
      navigate("/profile");
    }
    if (type === "negotiators") {
      localStorage.setItem("accreditationType", "negotiators");
      navigate("/profile");
    }
  };

  return (
    <section
      className="relative flex items-center justify-center flex-col  h-auto md:h-[92vh] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url("/images/globe.jpg")`, // Fix syntax error
      }}
      data-aos="zoom-in-right"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-co-primary opacity-90"></div>

      <div
        className="relative flex flex-col md:flex-row items-center justify-center md:justify-between gap-0 z-10 h-full w-full mt-20"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <CountdownTimer />
        <div
          className="text-gray-900 flex flex-col gap-6 md:gap-8 justify-center items-start text-center md:ml-[150px] md:text-left h-full w-full"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <div className="w-full flex justify-center">
            <img
              src="/images/ncc.png"
              alt="N"
              className="h-[100px] w-[100px] md:h-[150px] md:w-[150px] object-contain bg-white lg:ms-0 m-auto md:m-0 rounded-full"
              data-aos="fade-left"
              data-aos-duration="500"
            />
          </div>

          <h1 className="md:text-[40px] text-[25px] mt-20 md:mt-0 text-white font-bold leading-tight text-center w-full">
            WELCOME TO THE NIGERIA <br />
            <span className="text-[#d3e8d7] md:text-[40px] text-[25px]">
              UNFCCC COP29
            </span>
            <br /> REGISTRATION PORTAL
          </h1>
          <p
            className="leading-7 text-white md:inline text-[20px]"
            style={{ width: "100%", fontStyle: "italic" }}
          >
            NIGERIA'S FOCUS : Actualizing Financial Commitments For Climate
            Action
          </p>
          <div className="grid md:grid-cols-2 md:justify-start justify-center items-center gap-4 mt-10 md:mt-0 w-full">
            <div
              // onClick={() => handleNavigate("delegates")}
              className="text-center w-full rounded py-4 flex justify-center items-center text-white bg-green-800 hover:bg-green-700 transition"
              // data-aos="fade-up"
              // data-aos-duration="1000"
            >
              <FaCalendarAlt className="text-2xl mr-2" />
              Request Accreditation (Delegates)
            </div>
            <div
              // onClick={() => handleNavigate("negotiators")}
              className="text-center w-full rounded py-4 flex justify-center items-center text-white bg-blue-800 hover:bg-green-700 transition"
              // data-aos="fade-up"
              // data-aos-duration="1000"
            >
              <FaCalendarAlt className="text-2xl mr-2" />
              Request Accreditation (Negotiators)
            </div>
            {/* <Link
              to="/create-event"
              className="text-center w-full rounded py-4 flex justify-center items-center text-white bg-pink-800 hover:bg-green-700 transition"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <FaPlus className="text-2xl mr-2" />
              Schedule Meeting
            </Link> */}
            <Link
              to="/terms-and-conditions"
              className="text-center w-full rounded py-4 flex justify-center items-center text-red-800 hover:bg-red-200 bg-red-100 transition"
            >
              <FaInfoCircle className="text-2xl mr-2" />
              Important Notice
            </Link>
            <HashLink
              to="/faq#how-it-works"
              className="text-center w-full rounded py-4 flex justify-center items-center text-blue-800 hover:bg-blue-200 bg-blue-100 transition"
            >
              <FaQuestionCircle className="text-2xl mr-2" />
              How It Works
            </HashLink>
            <Link
              // to="/intl-org"
              to="#"
              className="text-center w-full rounded py-4 px-2 flex justify-center items-center text-white bg-orange-500 hover:bg-orange-400 transition"
            >
              <FaCalendarAlt className="text-2xl mr-2" />
              International Organization Meeting Request
            </Link>
            <button
              onClick={handleOpenPDF}
              className="text-center w-full rounded py-4 flex justify-center items-center text-white bg-pink-800 hover:bg-green-700 transition"
            >
               <AiOutlineFolderView className="text-2xl mr-2" />
              
              View COP29 Overview Schedule{" "}
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end justify-center space-y-0 w-full h-full ">
          <img
            src="/images/unfccc1_.png" // Replace with the path to your first image
            alt="Nigeria's coat of arm image"
            className="rounded-lg w-2/3 h-[80px] md:h-[150px] object-contain mt-6 mb-12"
            data-aos="fade-left"
            data-aos-duration="500"
          />
          <img
            src="/images/cop29-bgg.png" // Replace with the path to your second image
            alt="COP 29 image"
            className=" w-2/3 h-[80px] md:h-[130px] object-contain"
            data-aos="fade-left"
            data-aos-duration="500"
            style={{ borderRadius: "10%" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
