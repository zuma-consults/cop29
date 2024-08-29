import React, { useState } from "react";
// import DelegateForm from "./delegate-form";
import OrganizationForm from "./organisation-form";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [userType, setUserType] = useState<string>("organization");
  const navigate = useNavigate();
  const handleBack = ()=> {
    navigate("/")
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-green-800 p-10 w-full">
      <button
        className="absolute top-10 left-10 flex gap-4 text-white items-center text-[14px] z-50  px-4 py-2 rounded"
        style={{ backdropFilter: "blur(5px)" }}
        onClick={handleBack}
      >
        <FaArrowLeft size={22} />
        Go Home
      </button>

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("/images/globe.jpg")`,
          filter: 'brightness(0.4)' 
        }}
      >
        <div className="absolute inset-0 bg-green-800 opacity-60"></div>
      </div>

      <div className="relative bg-white shadow-md rounded-lg lg:w-[50%] mt-10 p-10 z-20">
        {/* <div className="flex mb-4">
          <button
            onClick={() => setUserType("delegate")}
            className={`flex-1 py-2 rounded-l-lg ${
              userType === "delegate"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Register as a delegate
          </button>
          <button
            onClick={() => setUserType("organization")}
            className={`flex-1 py-2 rounded-r-lg ${
              userType === "organization"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Register as an organization
          </button>
        </div> */}

        {/* {userType === "delegate" && <DelegateForm />} */}
        {userType === "organization" && <OrganizationForm />}
      </div>
    </div>
  );
};

export default Signup;
