import { useFormik } from "formik";
import * as Yup from "yup";
import { useForgot } from "../../components/custom-hooks/useAuth";
import Loader from "../../components/ui/Loader";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function ForgotPassword() {
  const { mutate, isLoading, isSuccess } = useForgot();
  const navigate = useNavigate();

  if (isSuccess) {
    navigate("/forgot-confirmation");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values: any) => {
      await mutate(values);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen">
      <button
        className="absolute top-10 left-10 flex gap-4 text-white items-center text-[14px] z-50  px-4 py-2 rounded"
        style={{ backdropFilter: "blur(5px)" }}
        onClick={() => {
          navigate("/");
        }}
      >
        <FaArrowLeft size={22} />
        Go Home
      </button>
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-green-800 text-white p-8">
        <div className="space-y-8 w-full max-w-md">
          <h3 className="text-4xl font-bold text-center">Forgot Password?</h3>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg mb-2">
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full p-3 rounded-md border border-green-600 bg-green-900 placeholder-gray-300 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email &&
              typeof formik.errors.email === "string" ? (
                <div className="text-red-500 text-sm mt-2">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Submitting" : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1">
        <img
          src="/images/globe.jpg"
          alt="Globe Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
