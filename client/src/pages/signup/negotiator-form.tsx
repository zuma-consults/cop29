import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaRegEyeSlash, FaRegEye, FaArrowLeft } from "react-icons/fa";
import Loader from "../../components/ui/Loader";
import { useNegotiatorRegister } from "../../components/custom-hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { states, thematicAreas } from "../../util/data";
// import TCModal from "../../components/ui/TCModal";
import TermsAndConditions from "../disclaimer";

interface FormValues {
  name: string;
  email: string;
  password: string;
  phone: string;
  userType: string;
  state: string;
  organizationType: string;
  thematicArea: string;
  contactDesignation: string;
  contactName: string;
  workStream: string;
  showPassword: boolean;
}

const organizationValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  phone: Yup.string().required("Phone number is required"),
  state: Yup.string().required("State is required"),
  organizationType: Yup.string().required("Organization Type is required"),
  thematicArea: Yup.string().required("Thematic Area is required"),
  contactDesignation: Yup.string().required("Designation is required"),
  contactName: Yup.string().required("Contact Name is required"),
  workStream: Yup.string().required("Workstream is required"),
  orgImage: Yup.mixed()
    .nullable()
    .required("Contact ID is required")
    .test(
      "FILE_FORMAT",
      "Invalid format. Only jpg and png are allowed.",
      (value) =>
        !value || (value && ["image/jpeg", "image/png"].includes(value.type))
    ),
});

const NegotiatorForm: React.FC = () => {
  const { mutate: orgRegister, isLoading, data } = useNegotiatorRegister();
  const navigate = useNavigate();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isChecked, setIsChecked] = useState<boolean>(false);
  // const [hasAgreed, setHasAgreed] = useState(false);
  const [accept, setAccept] = useState<boolean>(false);

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  // const handleAgreeTerms = () => {
  //   setHasAgreed(true);
  //   setIsChecked(true);
  //   setIsModalOpen(false);
  // };

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (data && data?.status) {
      toast.success("Account created successfully");
      navigate("/verify-confirmation");
    }
  }, [data, navigate]);

  // const handleTerms = () => {
  //   // navigate("/terms-and-conditions");
  //   setIsModalOpen(true);
  // };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {!accept && <TermsAndConditions />}
      {!accept && (
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-small font-semibold hover:bg-green-700 transition"
          onClick={() => setAccept(true)}
        >
          Click to Proceed
        </button>
      )}

      {accept && (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-green-800 p-10 w-full">
          <button
            className="absolute top-10 left-10 flex gap-4 text-white items-center text-[14px] z-50 px-4 py-2 rounded"
            style={{ backdropFilter: "blur(5px)" }}
            onClick={handleBack}
          >
            <FaArrowLeft size={22} />
            Go Home
          </button>

          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("/images/globe.jpg")`,
              filter: "brightness(0.4)",
            }}
          >
            <div className="absolute inset-0 bg-green-800 opacity-60"></div>
          </div>
          <div className="relative bg-white shadow-md rounded-lg lg:w-[50%] mt-10 p-10 z-20">
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                phone: "",
                userType: "organization",
                state: "",
                organizationType: "Ministries, Departments, and Agencies (MDA)",
                thematicArea: "",
                contactDesignation: "",
                contactName: "",
                workStream: "",
                showPassword: false,
                terms: true,
                orgImage: null,
              }}
              validationSchema={organizationValidationSchema}
              onSubmit={(values) => {
                const formData = new FormData();
                (Object.keys(values) as (keyof FormValues)[]).forEach((key) => {
                  const value = values[key];
                  if (key === "orgImage" && value instanceof File) {
                    formData.append("orgImage", value);
                  } else if (typeof value === "boolean") {
                    formData.append(key, value.toString());
                  } else {
                    formData.append(key, value);
                  }
                });

                orgRegister(formData);
              }}
            >
              {({ values, setFieldValue }) => (
                <Form className="p-2 shadow bg-green-50 mt-5">
                  <h1 className="text-2xl font-semibold mb-6 text-center text-green-800">
                    Create an Account as Negotiator
                  </h1>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Organization Name*
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your organization name"
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
                        placeholder="Enter your email address"
                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
                      />
                      <ErrorMessage
                        name="email"
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

                    <div className="relative mb-4">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Confirm Password*
                      </label>
                      <Field
                        type={values.showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Enter your confirm password"
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
                        name="confirmPassword"
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
                        placeholder="Enter phone number"
                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-600 text-xs mt-1"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="state"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        State*
                      </label>
                      <Field
                        as="select"
                        id="state"
                        name="state"
                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
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
                        className="text-red-600 text-xs mt-1"
                      />
                    </div>

                    {/* <div className="mb-4">
                  <label
                    htmlFor="organizationType"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Organization Type*
                  </label>
                  <Field
                    as="select"
                    id="organizationType"
                    name="organizationType"
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
                  >
                    <option value="Ministries, Departments, and Agencies (MDA)">
                      Ministries, Departments, and Agencies (MDA)
                    </option>
                  </Field>
                  <ErrorMessage
                    name="organizationType"
                    component="div"
                    className="text-red-600 text-xs mt-1"
                  />
                </div> */}

                    <div className="mb-4">
                      <label
                        htmlFor="thematicArea"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Thematic Area*
                      </label>
                      <Field
                        as="select"
                        id="thematicArea"
                        name="thematicArea"
                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
                      >
                        <option value="">Select Thematic Area</option>
                        {thematicAreas.map((thematicArea) => (
                          <option key={thematicArea} value={thematicArea}>
                            {thematicArea}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="text-red-600 text-xs mt-1"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="contactDesignation"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                         Designation*
                      </label>
                      <Field
                        type="text"
                        id="contactDesignation"
                        name="contactDesignation"
                        placeholder="Enter your designation"
                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
                      />
                      <ErrorMessage
                        name="contactDesignation"
                        component="div"
                        className="text-red-600 text-xs mt-1"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="contactName"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                         Name*
                      </label>
                      <Field
                        type="text"
                        id="contactName"
                        name="contactName"
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
                      />
                      <ErrorMessage
                        name="contactName"
                        component="div"
                        className="text-red-600 text-xs mt-1"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="workStream"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Work Stream*
                      </label>
                      <Field
                        type="text"
                        id="workStream"
                        name="workStream"
                        placeholder="Enter your area of focus"
                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
                      />
                      <ErrorMessage
                        name="workStream"
                        component="div"
                        className="text-red-600 text-xs mt-1"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="orgImage"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Your Passport Data Page (jpg/png)*
                      </label>
                      <input
                        type="file"
                        id="orgImage"
                        name="orgImage"
                        accept="image/jpeg,image/png"
                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 bg-white"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0] || null;
                          setFieldValue("orgImage", file);
                        }}
                      />
                      <ErrorMessage
                        name="orgImage"
                        component="div"
                        className="text-red-600 text-xs mt-1"
                      />
                    </div>
                  </div>

                  {/* Terms and Conditions Checkbox */}
                  {/* <div className="flex items-center mb-4" onClick={handleTerms}>
                    <Field
                      type="checkbox"
                      id="terms"
                      name="terms"
                      className="mr-2 h-4 w-4 text-green-600 border-gray-300 rounded"
                      disabled={!hasAgreed} // Disables checkbox if terms are not agreed
                    />
                    <label
                      htmlFor="terms"
                      className="block text-red-500 font-semibold italic cursor-pointer"
                      onClick={handleTerms}
                    >
                      I agree to the terms and conditions
                    </label>
                  </div> */}
                  {/* <ErrorMessage
                    name="terms"
                    component="div"
                    className="text-red-600 text-xs mt-1"
                  /> */}

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full bg-green-800 text-white font-semibold py-3 rounded-lg hover:bg-green-700"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          {/* <TCModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAgree={handleAgreeTerms}
          /> */}
        </div>
      )}
    </>
  );
};

export default NegotiatorForm;
