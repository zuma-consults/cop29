import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useRegister } from "../../components/custom-hooks/useAuth";
import Loader from "../../components/ui/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface FormValues {
  userType: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  terms: boolean;
  showPassword: boolean;
}

const delegateValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  designation: Yup.string().required("Designation is required"),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required(),
});

const DelegateForm: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: register, isLoading, isSuccess } = useRegister();
  const [file, setFile] = useState<File | null>(null);

  if (isLoading) {
    return <Loader />;
  }
  if (isSuccess) {
    navigate("/login");
  }
  return (
    <Formik
      initialValues={{
        userType: "delegate",
        name: "",
        email: "",
        phone: "",
        password: "",
        designation: "",
        terms: false,
        showPassword: false,
      }}
      validationSchema={delegateValidationSchema}
      onSubmit={(values, { resetForm }) => {
        const formData = new FormData();
        (Object.keys(values) as (keyof FormValues)[]).forEach((key) => {
          const value = values[key];
          if (typeof value === "boolean") {
            formData.append(key, value.toString());
          } else if (value !== "" && key !== "terms") {
            formData.append(key, value);
          }
        });

        if (file) {
          formData.append("files", file);
        } else {
          toast.warn("Upload approval document");
        }

        register(formData);
        resetForm();
        setFile(null);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="p-2 shadow bg-green-50 mt-5">
          <h1 className="text-2xl font-semibold mb-6 text-center text-green-800">
            Create a Delegate Account
          </h1>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name*
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-600 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email Address*
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-semibold mb-2"
            >
              Phone Number*
            </label>
            <Field
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-600 text-xs mt-1"
            />
          </div>

          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password*
            </label>
            <Field
              type={values.showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 pr-10"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-5"
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
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-600 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="designation"
              className="block text-gray-700 font-semibold mb-2"
            >
              Designation*
            </label>
            <Field
              type="text"
              id="designation"
              name="designation"
              placeholder="Enter your designation"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
            />
            <ErrorMessage
              name="designation"
              component="div"
              className="text-red-600 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="files"
              className="block text-gray-700 font-semibold mb-2"
            >
              Upload Approval Document (PDF)*
            </label>
            <input
              type="file"
              id="files"
              accept=".pdf"
              onChange={(event) => {
                if (event.currentTarget.files) {
                  setFile(event.currentTarget.files[0]);
                }
              }}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 bg-white"
            />
            <ErrorMessage
              name="files"
              component="div"
              className="text-red-600 text-xs mt-1"
            />
          </div>

          <div className="flex items-center mb-4">
            <Field
              type="checkbox"
              id="terms"
              name="terms"
              className="mr-2 h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <label
              htmlFor="terms"
              className="block text-gray-700 font-semibold mb-2"
            >
              I agree to the terms and conditions
            </label>
          </div>
          <ErrorMessage
            name="terms"
            component="div"
            className="text-red-600 text-xs mt-1"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Sign Up"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DelegateForm;
