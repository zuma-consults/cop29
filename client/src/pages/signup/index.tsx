import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { categories, organizationTypes, states } from "../../util/data";
import { useRegister } from "../../components/custom-hooks/useAuth";
import Loader from "../../components/ui/Loader";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  userType: Yup.string()
    .oneOf(["delegate", "organization"])
    .required("User type is required"),
  category: Yup.string(),
  state: Yup.string(),
  organizationType: Yup.string(),
  terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions").required(),
});

const Signup: React.FC = () => {
  const { mutate: register, isLoading } = useRegister();
  const [files, setLetterOfApproval] = useState<File | null>(null);
  const [orgImage, setOrgImage] = useState<File | null>(null);

  if (isLoading){
    return <Loader/>
  }

  return (
    <div className="flex w-full h-[130vh] bg-green-800">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white w-full md:w-[480px] p-5 m-10 md:m-0 grid gap-5 rounded-lg">
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
          <p className="text-[22px] font-semibold">Create an account</p>
          <p className="text-[14px] font-medium text-gray-600">
            Already have an account?{" "}
            <button
              className="text-green-500 cursor-pointer"
              onClick={() => window.location.replace("/login")}
            >
              Login
            </button>
          </p>

          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              password: "",
              category: "",
              state: "",
              organizationType: "",
              userType: "delegate",
              showPassword: false,
              terms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              // Append file states to values
              const formData = new FormData();
              Object.keys(values).forEach((key) => {
                if (values[key] !== "") {
                  formData.append(key, values[key]);
                }
              });

              if (files) {
                formData.append("files", files);
              }
              if (orgImage) {
                formData.append("orgImage", orgImage);
              }

              register(formData);
              resetForm();
              setLetterOfApproval(null);
              setOrgImage(null);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="grid gap-5">
                {/* User Type Selector */}
                <div className="mb-2">
                  <label
                    htmlFor="userType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Are you a delegate or an Organisation?
                  </label>
                  <Field
                    as="select"
                    name="userType"
                    className="border-[0.8px] border-gray-400 px-[10px] py-3 mb-2 text-[12px] w-full"
                  >
                    <option value="delegate">Delegate</option>
                    <option value="organization">Organization</option>
                  </Field>
                  <ErrorMessage
                    name="userType"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                {/* Common Fields */}
                <div className="grid gap-1">
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name*"
                    className="border-[0.8px] border-gray-400 px-[10px] py-3 text-[12px]"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

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

                <div className="grid gap-1">
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number*"
                    className="border-[0.8px] border-gray-400 px-[10px] py-3 text-[12px]"
                  />
                  <ErrorMessage
                    name="phone"
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

                {/* Organization Specific Fields */}
                {values.userType === "organization" && (
                  <>
                    <div className="mb-2">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category
                      </label>
                      <Field
                        as="select"
                        id="category"
                        name="category"
                        className="border-[0.8px] border-gray-400 px-[10px] py-3 text-[12px] w-full"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State
                      </label>
                      <Field
                        as="select"
                        id="state"
                        name="state"
                        className="border-[0.8px] border-gray-400 px-[10px] py-3 text-[12px] w-full"
                      >
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="organizationType"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Organization Type
                      </label>
                      <Field
                        as="select"
                        id="organizationType"
                        name="organizationType"
                        className="border-[0.8px] border-gray-400 px-[10px] py-3 text-[12px] w-full"
                      >
                        <option value="">Select Organization Type</option>
                        {organizationTypes.map((orgType) => (
                          <option key={orgType} value={orgType}>
                            {orgType}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="organizationType"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    {/* File Uploads */}
                    <div className="mb-2">
                      <label
                        htmlFor="letterOfApproval"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Letter of Approval
                      </label>
                      <input
                        type="file"
                        id="letterOfApproval"
                        onChange={(event) => {
                          if (event.currentTarget.files) {
                            setLetterOfApproval(event.currentTarget.files[0]);
                          }
                        }}
                        className="border-[0.8px] border-gray-400 px-[10px] py-3 text-[12px] w-full"
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="orgImage"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Organization Image
                      </label>
                      <input
                        type="file"
                        id="orgImage"
                        onChange={(event) => {
                          if (event.currentTarget.files) {
                            setOrgImage(event.currentTarget.files[0]);
                          }
                        }}
                        className="border-[0.8px] border-gray-400 px-[10px] py-3 text-[12px] w-full"
                      />
                    </div>
                  </>
                )}

                 {/* Terms and Conditions Checkbox */}
                 <div className="flex items-center">
                  <Field
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="mr-2"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the terms and conditions
                  </label>
                </div>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="text-red-500 text-xs"
                />

                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Sign Up"}
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
        <img
          src="/images/globe.jpg"
          alt="Image description"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
