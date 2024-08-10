import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Loader from "./components/ui/Loader";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/home";
import Delegate from "./pages/delegate";
import Organization from "./pages/organization";
import Calender from "./pages/calender";
import Event from "./pages/sideEvent";
import Invoice from "./pages/invoice";
import User from "./pages/user";
import Announcement from "./pages/announcement";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/delegate" element={<Delegate />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/event" element={<Event />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/user" element={<User />} />
        <Route path="/announcement" element={<Announcement />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
