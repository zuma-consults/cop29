import { useState, useEffect } from "react";
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

function App() {
  const [loading, setLoading] = useState(true);
  AOS.init({
    duration: 1200,
    offset: 100,
    easing: "ease-in-out",
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/account-activation" element={<AccountActivation />} />
      
      <Route path="/" element={<AppLayout />}>
       <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faq" element={<FAQ />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
