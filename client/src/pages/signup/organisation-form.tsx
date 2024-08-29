import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { categories, organizationTypes, states, thematicAreas } from "../../util/data";
import Loader from "../../components/ui/Loader";
import { useOrgRegister } from "../../components/custom-hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface FormValues {
  userType: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  category: string;
  state: string;
  organizationType: string;
  terms: boolean;
  showPassword: boolean;
}

const organizationValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords must match")
    .required("Please confirm your password"),
  category: Yup.string().required("Category is required"),
  thematicArea: Yup.string().required("Thematic Area is required"),
  state: Yup.string(),
  organizationType: Yup.string().required("Organization Type is required"),
  reasonForAttendance: Yup.string().required("Reason for attending is required"),
  contactDesignation: Yup.string().required("Designation of Contact Person is required"),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required(),
});

const OrganizationForm: React.FC = () => {
  const { mutate: orgRegister, isLoading, data } = useOrgRegister();
  const [files, setFiles] = useState<File | null>(null);
  const [documentSupportingAttendance, setDocumentSupportingAttendance] = useState<File | null>(null);
  const [orgImage, setOrgImage] = useState<File | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (data && data?.status) {
      toast.success("Account created successfully");
      navigate("/verify-confirmation");
    }
  }, [data, navigate]);
  const handleTerms = () => {
    navigate("/terms-and-conditions");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={{
        userType: "organization",
        name: "",
        email: "",
        phone: "",
        password: "",
        category: "",
        state: "",
        organizationType: "",
        reasonForAttendance: "",
        contactDesignation: "",
        thematicArea: "",
        terms: false,
        showPassword: false,
      }}
      validationSchema={organizationValidationSchema}
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

        if (files) formData.append("files", files);
        if (orgImage) formData.append("orgImage", orgImage);
        if (documentSupportingAttendance) formData.append("documentSupportingAttendance", documentSupportingAttendance);
   
        if (!files || !orgImage) {
          toast.warn("Upload required files");
        } else {
          orgRegister(formData);
          resetForm();
          setFiles(null);
          setOrgImage(null);
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="p-2 shadow bg-green-50 mt-5">
          <h1 className="text-2xl font-semibold mb-6 text-center text-green-800">
            Create an Account for your Organisation
          </h1>
          {/* Organization Fields */}
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
              Contact Person's Phone Number*
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

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-semibold mb-2"
            >
              Category*
            </label>
            <Field
              as="select"
              id="category"
              name="category"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
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
              className="text-red-600 text-xs mt-1"
            />
          </div>

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
              htmlFor="state"
              className="block text-gray-700 font-semibold mb-2"
            >
              State
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

          <div className="mb-4">
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
              <option value="">Select Organization Type</option>
              {organizationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="organizationType"
              component="div"
              className="text-red-600 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="contactDesignation"
              className="block text-gray-700 font-semibold mb-2"
            >
              Contact Person's Designation*
            </label>
            <Field
              type="text"
              id="contactDesignation"
              name="contactDesignation"
              placeholder="contact person's designation"
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
              htmlFor="files"
              className="block text-gray-700 font-semibold mb-2"
            >
              Letter Approving Organisation Participation (pdf file max 2mb)*
            </label>
            <input
              type="file"
              id="files"
              accept=".pdf"
              onChange={(event) => {
                const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB in bytes
                const file = event.currentTarget.files
                  ? event.currentTarget.files[0]
                  : null;

                if (file && file.size > maxSizeInBytes) {
                  toast.error(
                    "File size exceeds the 2 MB limit. Please select a smaller file."
                  );
                  event.currentTarget.value = "";
                } else if (file) {
                  setFiles(file);
                }
              }}
              className="bg-white w-full border border-gray-300 rounded-lg p-3 text-gray-700"
            />
            <ErrorMessage
              name="files"
              component="div"
              className="text-red-600 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="orgImage"
              className="block text-gray-700 font-semibold mb-2"
            >
             Upload Scanned Copy of Contact Person's ID Card*
            </label>
            <input
              type="file"
              id="orgImage"
              accept=".png, .jpg, .jpeg"
              onChange={(event) => {
                if (event.currentTarget.files) {
                  setOrgImage(event.currentTarget.files[0]);
                }
              }}
              className="bg-white w-full border border-gray-300 rounded-lg p-3 text-gray-700"
            />
            <ErrorMessage
              name="orgImage"
              component="div"
              className="text-red-600 text-xs mt-1"
            />
          </div>
          </div>

          {/* File Uploads */}


          <div className="mb-4">
            <label
              htmlFor="reasonForAttendance"
              className="block text-gray-700 font-semibold mb-2"
            >
              Reason for Attendance*
            </label>
            <Field
              type="text"
            as="textarea"
              id="reasonForAttendance"
              name="reasonForAttendance"
              placeholder="Reason for attending "
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
            />
            <ErrorMessage
              name="reasonForAttendance"
              component="div"
              className="text-red-600 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="supportImage"
              className="block text-gray-700 font-semibold mb-2"
            >
             Upload Document Supporting Reason for Attendance (pdf file max 2mb)
            </label>
            <input
              type="file"
              id="supportImage"
              accept=".pdf"
              onChange={(event) => {
                const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB in bytes
                const file = event.currentTarget.files
                  ? event.currentTarget.files[0]
                  : null;

                if (file && file.size > maxSizeInBytes) {
                  toast.error(
                    "File size exceeds the 2 MB limit. Please select a smaller file."
                  );
                  event.currentTarget.value = "";
                } else if (file) {
                  setDocumentSupportingAttendance(file);
                }
              }}
              className="bg-white w-full border border-gray-300 rounded-lg p-3 text-gray-700"
            />
            <ErrorMessage
              name="orgImage"
              component="div"
              className="text-red-600 text-xs mt-1"
            />
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center mb-4">
            <Field
              type="checkbox"
              id="terms"
              name="terms"
              className="mr-2 h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <label
              htmlFor="terms"
              className="block text-red-500 font-semibold italic cursor-pointer"
              onClick={handleTerms}
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
            // disabled={isLoading}
            disabled
          >
            {isLoading ? "Submitting..." : "Sign Up"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default OrganizationForm;
