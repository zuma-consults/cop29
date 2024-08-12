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
import PrivateRoute from "./layouts/PrivateRoute";
import PublicRoute from "./layouts/PublicRoute";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="/" element={<AppLayout />}>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/delegate" element={<Delegate />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/event" element={<Event />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/user" element={<User />} />
          <Route path="/announcement" element={<Announcement />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
