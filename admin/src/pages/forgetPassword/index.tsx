import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import Loader from "../../components/ui/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../../services/auth";

// Define an interface for the form data
interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    // Update the parameter type
    setIsLoading(true);
    try {
      const payload = {
        email: data.email,
      };
      const result = await forgotPassword(payload);
      if (result?.status) {
        toast.success("Password reset link sent to your email.");
        navigate("/forgot-password/success", { replace: true });
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex h-screen bg-green-800 justify-between">
        <div className="flex-1 flex items-center justify-center px-2 md:px-0">
          <div className="bg-white w-full h-max md:w-[480px] p-5 grid gap-3 rounded-lg">
            <div className="w-full h-max flex flex-col items-center justify-center gap-1">
              <div className="w-full h-max flex flex-col items-center justify-center gap-1">
                <img
                  src="/images/seal.png"
                  alt="Description of image"
                  width={100}
                  height={100}
                  className="rounded-lg cursor-pointer"
                />
              </div>
            </div>
            <p className="text-[22px] font-semibold">Forgot Password</p>
            <p className="text-[14px] font-medium text-gray-600">
              Enter your email to receive a password reset link.
            </p>
            <TextField
              type="email"
              label="Email Address*"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email address",
                },
              })}
              error={!!errors.email}
              helperText={
                errors.email ? (errors.email.message as string) : undefined
              }
            />
            <Button
              type="submit"
              color="success"
              variant="contained"
              onClick={handleSubmit(handleForgotPassword)}
              className="mt-3 w-full font-semibold"
            >
              Send Reset Link
            </Button>
            <Button
              color="primary"
              onClick={() => navigate("/login")}
              className="mt-2 w-full"
            >
              Back to Login
            </Button>
          </div>
        </div>

        <div className="flex-1 bg-green-200 hidden md:block">
          <img
            src="/images/globe.jpg"
            alt="Image description"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
