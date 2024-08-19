import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ForgotPasswordConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-green-800 justify-center items-center">
      <button
        className="absolute top-10 left-10 flex gap-4 text-white items-center text-[14px] z-50  px-4 py-2 rounded"
        style={{ backdropFilter: "blur(5px)" }}
        onClick={handleBack}
      >
        <FaArrowLeft size={22} />
        Go Home
      </button>
      <div className="bg-white w-full h-max md:w-[480px] p-5 grid gap-3 rounded-lg text-center">
        <h2 className="text-[22px] font-semibold">Check Your Email</h2>
        <p className="text-[16px]">
          We've sent an email with instructions to reset your password. Please
          check your inbox.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-full py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition duration-200"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordConfirmation;
