import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useActivate, useResendActivation } from "../../components/custom-hooks/useAuth";
import Loader from "../../components/ui/Loader";
import { FaArrowLeft } from "react-icons/fa";

function AccountActivation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate: activate, isLoading, data } = useActivate();
  const { mutate: resendActivation, isLoading: isResending } = useResendActivation();
  const [, setCookie] = useCookies(["accessToken"]);
  const [isExpired, setIsExpired] = useState(false);
  const [email, setEmail] = useState(""); // State to hold the email input

  useEffect(() => {
    if (id) {
      setCookie("accessToken", id);
      activate();
    }
  }, [id, setCookie, activate, navigate]);

  useEffect(() => {
    console.log(data,'data')
    if (data?.response?.status === 403) {
      toast.error("Activation link has expired.");
      setIsExpired(true);
    } 
    if (data?.status) {
      toast.success("Account activated successfully");
      navigate("/verify/success");
    } 
  }, [data, navigate]);

  const handleResendLink = () => {
    resendActivation({ email }, {
      onSuccess: () => {
        toast.success("A new activation link has been sent to your email.");
        navigate("/verify-confirmation");
      },
      onError: () => {
        toast.error("Failed to resend the activation link. Please try again.");
      }
    });
  };

  if (isLoading || isResending) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <button
        className="absolute top-5 left-5 flex gap-4 text-white items-center text-sm z-50 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
        style={{ backdropFilter: "blur(5px)" }}
        onClick={() => navigate("/")}
      >
        <FaArrowLeft size={20} />
        Go Home
      </button>

      <div className="flex-1 flex flex-col justify-center items-center bg-green-900 text-white p-6 sm:p-8 md:p-12 lg:p-16">
        {isExpired ? (
          <div className="space-y-6 w-full max-w-lg">
            <h3 className="text-3xl sm:text-4xl font-bold text-center">Link Expired</h3>
            <p className="text-center text-lg">Your activation link has expired. Please resend the activation link.</p>
            <div className="mt-6 flex flex-col gap-4 items-center">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 w-full sm:w-80 rounded-md border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Email address"
              />
              <button
                onClick={handleResendLink}
                className="w-full sm:w-80 px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200 disabled:opacity-50"
                disabled={!email}
              >
                Resend Activation Link
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 w-full max-w-lg">
            <h3 className="text-3xl sm:text-4xl font-bold text-center">Activate Your Account</h3>
            <p className="text-center text-lg">Please wait while we activate your account.</p>
          </div>
        )}
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
