import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useReset } from "../../components/custom-hooks/useAuth";
import Loader from "../../components/ui/Loader";
import { FaArrowLeft } from "react-icons/fa";

function ResetPassword() {
  const navigate = useNavigate();
  const { mutate, isLoading, data } = useReset();
  const [, setCookie] = useCookies(["accessToken"]);
  const { id } = useParams();

  if(!id) {
    return
  }

  useEffect(() => {
    if (id) {
      setCookie("accessToken", id);
    }
  }, [id, setCookie]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values) => {
      id ? mutate(values) : toast.warn('refresh and try again')
    },
  });

  if (data) {
    toast.success("Account Reset successfully");
    navigate("/login");
  }

  if(isLoading){
    return <Loader/>
  }

  return (
    <div className="flex h-screen">
              <button
          className="absolute top-10 left-10 flex gap-4 text-white items-center text-[14px] z-50  px-4 py-2 rounded"
          style={{ backdropFilter: "blur(5px)" }}
          onClick={()=>{navigate("/");}}
        >
          <FaArrowLeft size={22} />
          Go Home
        </button>
      <div className="flex-1 flex flex-col justify-center items-center bg-green-800 text-white p-8">
        <div className="space-y-8 w-full max-w-md">
          <h3 className="text-4xl font-bold text-center">
            Reset Your Password
          </h3>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-lg mb-2">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full p-3 rounded-md border border-green-600 bg-green-900 placeholder-gray-300 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter your new password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-2">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-lg mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="w-full p-3 rounded-md border border-green-600 bg-green-900 placeholder-gray-300 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Confirm your new password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm mt-2">
                  {formik.errors.confirmPassword}
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

export default ResetPassword;
