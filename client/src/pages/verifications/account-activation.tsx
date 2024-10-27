import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useActivate } from "../../components/custom-hooks/useAuth";
import Loader from "../../components/ui/Loader";
import { FaArrowLeft } from "react-icons/fa";

function AccountActivation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate: activate, isLoading, data } = useActivate();

  const [, setCookie] = useCookies(["accessToken"]);
  // State to hold the email input

  useEffect(() => {
    if (id) {
      setCookie("accessToken", id);
      activate();
    }
  }, [id]);

  useEffect(() => {
    if (data?.status) {
      toast.success("Account activated successfully");
      navigate("/verify/success");
    } else{
      // toast.success("Account activated successfully");
      navigate("/verify/resend");
    }
    
    // else {
    //   toast.error(
    //     "There was an error activating your account, resend your registered email."
    //   );
    //   navigate("/verify/resend");
    // }
  }, [data, navigate]);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {isLoading && <Loader />}
      <button
        className="absolute top-5 left-5 flex gap-4 text-white items-center text-sm z-50 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
        style={{ backdropFilter: "blur(5px)" }}
        onClick={() => navigate("/")}
      >
        <FaArrowLeft size={20} />
        Go Home
      </button>

      <div className="flex-1 flex flex-col justify-center items-center bg-green-900 text-white p-6 sm:p-8 md:p-12 lg:p-16">
        <div className="space-y-6 w-full max-w-lg">
          <h3 className="text-3xl sm:text-4xl font-bold text-center">
            Activate Your Account
          </h3>
          <p className="text-center text-lg">
            Please wait while we activate your account.
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1">
        <img
          src="/images/globe.jpg"
          alt="Globe Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default AccountActivation;
