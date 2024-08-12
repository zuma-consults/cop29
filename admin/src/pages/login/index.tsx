import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Loader from "../../components/ui/Loader";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useAuth";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const showPassword = watch("showPassword", false);
  const { mutate, isLoading, data } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data?.status) {
      setTimeout(() => {
        navigate("/");
      }, 100);
    }
  }, [data, navigate]);

  const handleLogin = (loginData: any) => {
    mutate(loginData);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex h-screen bg-green-800 justify-between">
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white w-full h-max md:w-[480px] p-5 grid gap-3 rounded-lg">
            <div className="w-full h-max flex flex-col items-center justify-center gap-1">
              <img
                src="/images/coat.png"
                alt="Description of image"
                width={100}
                height={10}
                className="rounded-lg cursor-pointer"
                onClick={() => window.location.replace("/")}
              />
            </div>
            <p className="text-[22px] font-semibold">Log into your account</p>
            <p className="text-[14px] font-medium text-gray-600">
              Don’t have an account?{" "}
              <button
                className="text-green-500 cursor-pointer"
                onClick={() => window.location.replace("/#")}
              >
                Sign up
              </button>
            </p>
            <TextField
              type="email"
              label="Email Address*"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={
                errors.email ? (errors.email.message as string) : undefined
              }
            />
            <TextField
              type={showPassword ? "text" : "password"}
              label="Password*"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("password", { required: "Password is required" })}
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
            <Button disabled>
              <a href="/#">Forgot Password?</a>
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

        <div className="flex-1 bg-green-200">
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
