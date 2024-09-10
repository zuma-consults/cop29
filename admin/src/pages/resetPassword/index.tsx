import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Loader from "../../components/ui/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/auth";

const ResetPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const showPassword = watch("showPassword", false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["accessToken"]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setCookie("accessToken", id);
    }
  }, [id, setCookie]);

  const handleResetPassword = async (resetData: any) => {
    if (!id) {
      toast.error("Invalid reset link");
      return;
    }
    const { newPassword, confirmPassword } = resetData;
    const payload = {
      password: newPassword,
      confirmPassword: confirmPassword,
    };
    setIsLoading(true);
    try {
      const result = await resetPassword(payload);
      if (result?.status) {
        toast.success("Password reset successful");
        navigate("/reset-password/success", { replace: true });
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
            <p className="text-[22px] font-semibold">Reset Your Password</p>

            <TextField
              type={showPassword ? "text" : "password"}
              label="New Password*"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                  message:
                    "Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
                },
              })}
              error={!!errors.newPassword}
              helperText={
                errors.newPassword
                  ? (errors.newPassword.message as string)
                  : undefined
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={() => setValue("showPassword", !showPassword)}
                      size="small"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              type={showPassword ? "text" : "password"}
              label="Confirm Password*"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword
                  ? (errors.confirmPassword.message as string)
                  : undefined
              }
            />

            <Button
              type="submit"
              color="success"
              variant="contained"
              onClick={handleSubmit(handleResetPassword)}
              className={`mt-3 w-full font-semibold`}
            >
              Reset Password
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

export default ResetPassword;
