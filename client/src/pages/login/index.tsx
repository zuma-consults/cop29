import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const Login: React.FC = () => {
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setAgreed(event.target.checked);
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = () => {
    setIsLoading(true);
    // Perform your login logic here
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    // Redirect or perform forgot password logic here
  };

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex h-screen bg-green-800 justify-between">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white w-full h-max  md:w-[480px] p-5 grid gap-3 rounded-lg" data-aos="zoom-in-right">
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
              onClick={() => window.location.replace("/signup")}
            >
              Sign up
            </button>
          </p>
          <input
            type="email"
            placeholder="Email Address*"
            className="border-[0.8px] border-gray-400 px-[10px] py-3 mb-2 text-[12px]"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password*"
              className="border-[0.8px] border-gray-400 px-[10px] py-3 mb-2 text-[12px] w-full pr-10"
              value={password}
              onChange={handlePasswordChange}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={handlePasswordVisibility}
            >
              {showPassword ? (
                <FaRegEye size={20} />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="form-checkbox text-green-500 h-4 w-4"
                checked={agreed}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="terms"
                className="ml-2 text-gray-600 text-[12px] font-medium"
              >
                Remember me
              </label>
            </div>
            <button
              onClick={handleForgotPassword}
              className="text-green-500 text-[12px] font-medium"
            >
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className={`mt-3 px-4 py-3 rounded font-semibold ${agreed
              ? "bg-green-700 text-white"
              : "bg-green-700 text-white cursor-not-allowed"
              }`}
            disabled={!email || !password}
          >
            Log In
          </button>
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
  );
};

export default Login;
