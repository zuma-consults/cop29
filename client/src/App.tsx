import { useState, useEffect, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import EventDetails from "./pages/eventDetails";
import Home from "./pages/home";
import Events from "./pages/events";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CreateEvent from "./pages/create-event";
import Loader from "./components/ui/Loader";
import AppLayout from "./layouts/AppLayout";
import AOS from "aos";
import TermsAndConditions from "./pages/disclaimer";
import "aos/dist/aos.css";
import Profile from "./pages/profile";
import FAQ from "./pages/faq";
import "./App.css";
import ForgotPassword from "./pages/verifications/forgot-password";
import ResetPassword from "./pages/verifications/reset-password";
import AccountActivation from "./pages/verifications/account-activation";
import Contact from "./pages/contact-us";
import NotFound from "./pages/NotFound";
import ForgotPasswordConfirmation from "./pages/verifications/forgot-password-confirmation";
import ActivationSuccess from "./pages/verifications/activation-success";
import VerificationConfirmation from "./pages/verifications/verify-confirm";
import InternationalOrg from "./pages/intl-org";
import { getProfile } from "./services/auth";
import NegotiatorForm from "./pages/signup/negotiator-form";
import { MdBuild } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { detectDevTools } from "./components/custom-hooks/detectDevtools";
import ResendActivation from "./pages/verifications/resend-activation";

function App() {
  const [loading, setLoading] = useState(true);
  const env = import.meta.env.VITE_ENV; // Access the environment variable

  useEffect(() => {
    // Disable right-click
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    // Disable F12, Ctrl+Shift+I (Inspect)
    const handleKeydown = (event: any) => {
      if (
        event.keyCode === 123 || // F12
        (event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ctrl+Shift+I
        (event.ctrlKey && event.shiftKey && event.keyCode === 74) // Ctrl+Shift+J (Console)
      ) {
        event.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeydown);

    // Detect DevTools open
    detectDevTools();

    return () => {
      document.removeEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    // Disable right-click
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    // Disable copy, cut, and paste
    const handleCopyCutPaste = (event: ClipboardEvent) => {
      event.preventDefault();
    };
    document.addEventListener("copy", handleCopyCutPaste);
    document.addEventListener("cut", handleCopyCutPaste);
    document.addEventListener("paste", handleCopyCutPaste);

    // Disable dragging for images and links
    const preventDrag = (event: DragEvent) => {
      event.preventDefault();
    };
    document.addEventListener("dragstart", preventDrag);

    return () => {
      document.removeEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
      document.removeEventListener("copy", handleCopyCutPaste);
      document.removeEventListener("cut", handleCopyCutPaste);
      document.removeEventListener("paste", handleCopyCutPaste);
      document.removeEventListener("dragstart", preventDrag);
    };
  }, []);

  const fetchUserProfile = useCallback(async () => {
    try {
      const result = await getProfile();
      if (result?.status) {
        localStorage.setItem("userProfile", JSON.stringify(result?.data));
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      offset: 100,
      easing: "ease-in-out",
    });

    fetchUserProfile();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [fetchUserProfile]);

  if (loading) {
    return <Loader />;
  }

  if (env === "dev") {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-green-800 p-10 w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("/images/globe.jpg")`,
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="relative bg-white shadow-md rounded-lg lg:w-[30%] mt-10 p-10 z-20">
          <MdBuild className="text-6xl text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Site Under Construction</h1>
          <p className="text-lg mb-4">
            We're working hard to get this site ready for you. Please check back
            later!
          </p>
          <p className="text-sm text-gray-500">Thank you for your patience.</p>
          <div className="mt-6">
            <FaTools className="text-gray-500 text-4xl mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/signup" element={<Signup />} />
      <Route path="/negotiator" element={<NegotiatorForm />} /> */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/forgot-confirmation"
        element={<ForgotPasswordConfirmation />}
      />
      <Route
        path="/verify-confirmation"
        element={<VerificationConfirmation />}
      />
      <Route path="/reset-password/:id" element={<ResetPassword />} />
      <Route path="/verify/:id" element={<AccountActivation />} />
      <Route path="/verify/resend" element={<ResendActivation />} />
      <Route path="/verify/success" element={<ActivationSuccess />} />

      <Route path="/" element={<AppLayout />}>
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/intl-org" element={<InternationalOrg />} />
        <Route path="/events" element={<Events />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
