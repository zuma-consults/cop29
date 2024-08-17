import React, { useState } from "react";
import DelegateForm from "./delegate-form";
import OrganizationForm from "./organisation-form";

const Signup: React.FC = () => {
  const [userType, setUserType] = useState<string>("delegate");

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-green-800 p-10 w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("/images/globe.jpg")`,
          filter: 'brightness(0.4)' // Adjust brightness or use hue-rotate filter if needed
        }}
      >
        <div className="absolute inset-0 bg-green-800 opacity-60"></div>
      </div>

      <div className="relative bg-white shadow-md rounded-lg w-[50%] p-10">
        <div className="flex mb-4">
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
        </div>

        {userType === "delegate" && <DelegateForm />}
        {userType === "organization" && <OrganizationForm />}
      </div>
    </div>
  );
};

export default Signup;
