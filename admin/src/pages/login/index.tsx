import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Loader from "../../components/ui/Loader";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const Login: React.FC = () => {
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

  const handleLogin = async (loginData: any) => {
    setIsLoading(true);
    try {
      const result = await login(loginData);
      if (result?.status) {
        toast.success("Login Successful");
        const accessToken = result?.data;
        cookies.set("accessToken", accessToken, { path: "/" });
        navigate("/scheduled-meetings", { replace: true });
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
            <p className="text-[22px] font-semibold">Log into your account</p>

            <TextField
              type="username"
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("username", {
                required: "Username is required",
              })}
              error={!!errors.username}
              helperText={
                errors.username
                  ? (errors.username.message as string)
                  : undefined
              }
            />
            <TextField
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
              error={!!errors.password}
              helperText={
                errors.password
                  ? (errors.password.message as string)
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
            <Button
              color="primary"
              onClick={() => navigate("/forgot-password")}
              className="mt-2 w-full"
            >
              Forgot Password?
            </Button>

            <Button
              type="submit"
              color="success"
              variant="contained"
              onClick={handleSubmit(handleLogin)}
              className={`mt-3 w-full font-semibold ${
                watch("agreed") ? "" : "cursor-not-allowed"
              }`}
            >
              Log In
            </Button>
          </div>
        </div>

        <div className="flex-1 bg-green-200 hidden md:block ">
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

export default Login;
