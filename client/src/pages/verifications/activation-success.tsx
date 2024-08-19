import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ActivationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100 text-green-800">
      <FaCheckCircle size={120} className="text-green-600" />
      <h2 className="text-4xl font-bold mt-8">Account Activated!</h2>
      <p className="text-lg mt-4">Your account has been successfully activated.</p>
      <button
        onClick={() => navigate("/login")}
        className="mt-8 px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition duration-200"
      >
        Go to Login
      </button>
    </div>
  );
}

export default ActivationSuccess;
