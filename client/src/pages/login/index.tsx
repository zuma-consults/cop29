import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaRegEyeSlash, FaRegEye, FaArrowLeft } from "react-icons/fa";
import { useLogin } from "../../components/custom-hooks/useAuth"; // Assume you have a useLogin hook
import { useNavigate } from "react-router-dom";
import Loader from "../../components/ui/Loader";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  // rememberMe: Yup.boolean(),
});

const Login: React.FC = () => {
  const { mutate: login, isLoading } = useLogin();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-green-800">
      <div className="flex-1 flex items-center justify-center ">
        <button
          className="absolute top-10 left-10 flex gap-4 text-white items-center text-[14px] z-50  px-4 py-2 rounded"
          style={{ backdropFilter: "blur(5px)" }}
          onClick={()=>{navigate("/");}}
        >
          <FaArrowLeft size={22} />
          Go Home
        </button>

        <div
          className="bg-white w-full md:w-[480px] p-5 m-10 md:m-0 grid gap-3 rounded-lg"
          data-aos="zoom-in-right"
        >
          <div className="w-full h-max flex flex-col items-center justify-center gap-1">
            <img
              src="/images/coat.png"
              alt="Description of image"
              width={100}
              height={100}
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

          <Formik
            initialValues={{
              email: "",
              password: "",
              rememberMe: false,
              showPassword: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(
              { showPassword, rememberMe, ...values },
              { resetForm }
            ) => {
              login(values, {
                onSuccess: () => {
                  navigate("/");
                },
              });
              resetForm();
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="grid gap-5">
                <div className="grid gap-1">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address*"
                    className="border-[0.8px] border-gray-400 px-[10px] py-3 text-[12px]"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="relative flex items-center">
                  <Field
                    type={values.showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password*"
                    className="border-[0.8px] border-gray-400 px-[10px] py-3 text-[12px] w-full pr-10"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() =>
                      setFieldValue("showPassword", !values.showPassword)
                    }
                  >
                    {values.showPassword ? (
                      <FaRegEye size={20} />
                    ) : (
                      <FaRegEyeSlash size={20} />
                    )}
                  </div>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs"
                />

                <Link
                  className="flex items-center mb-4 text-sm font-medium text-green-700 underline"
                  to={"/forgot-password"}
                >
                  Forgot Password
                </Link>

                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="hidden md:flex flex-1 bg-green-200 relative">
        <div className="absolute inset-0 bg-co-primary opacity-50"></div>
        <img
          src="/images/globe.jpg"
          alt="Image description"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Mobile Background Image */}
      <div className="hidden md:flex-1 md:relative">
        <div className="absolute inset-0 bg-co-primary opacity-50"></div>
        <img
          src="/images/globe.jpg"
          alt="Image description"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
