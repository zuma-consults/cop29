import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgotPasswordConfirmation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-green-800 justify-center items-center">
      <div className="bg-white w-full h-max md:w-[480px] p-5 grid gap-3 rounded-lg text-center">
        <h2 className="text-[22px] font-semibold">Check Your Email</h2>
        <p className="text-[16px]">
          We've sent an email with instructions to reset your password. Please
          check your inbox or spam folder.
        </p>

        <Button
          type="button"
          color="success"
          variant="contained"
          onClick={() => navigate("/login")}
          className={`mt-3 w-full font-semibold`}
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordConfirmation;
