import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContact } from "../../components/custom-hooks/usecontact";
import { toast } from "react-toastify";
import Loader from "../../components/ui/Loader";
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .required("Email is required"),
  message: Yup.string()
    .max(300, "Message must be 300 words or less")
    .required("Message is required"),
});

const Contact: React.FC = () => {
  const { mutate, isLoading, data } = useContact();

  useEffect(() => {
    if (data && data?.status) {
      toast.success("Contact sent successfully", {
        toastId: "contact us toast"
      });
    } 
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-green-800">
      <div className="flex-1 flex items-center justify-center">
        <div
          className="bg-white w-full md:w-[480px] p-5 m-10 md:m-0 grid gap-3 rounded-lg"
          data-aos="zoom-in-right"
        >
          <div className="w-full h-max flex flex-col items-center justify-center gap-1">
            <img
              src="/images/coat.png"
              alt="Logo"
              width={100}
              height={100}
              className="rounded-lg cursor-pointer"
              onClick={() => window.location.replace("/")}
            />
          </div>
          <p className="text-[22px] font-semibold">Contact Us</p>
          <p className="text-[14px] font-medium text-gray-600">
            Have concerns and questions? Reach out to us.
          </p>

          <Formik
            initialValues={{ name: "", email: "", phone: "", message: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              const formattedData = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                message: values.message,
              };

              mutate(formattedData)
              resetForm();
            }}
          >
            {() => (
              <Form className="grid gap-5">
                <div className="grid gap-1">
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name*"
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
                    placeholder="Your Email*"
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
                    placeholder="Your Phone Number*"
                    className="border-[0.8px] border-gray-400 px-[10px] py-3 text-[12px]"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="grid gap-1">
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Your Message*"
                    className="border-[0.8px] border-gray-400 px-[10px] py-3 text-[12px] w-full"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded-lg"
                >
                  Submit
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
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Mobile Background Image */}
      <div className="hidden md:flex-1 md:relative">
        <div className="absolute inset-0 bg-co-primary opacity-50"></div>
        <img
          src="/images/globe.jpg"
          alt="Mobile Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Contact;
