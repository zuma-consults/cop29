import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AppLayout from "./layouts/AppLayout";
import PublicRoute from "./layouts/PublicRoute";
import Delegate from "./pages/delegate";
import Organization from "./pages/organization";
import Calender from "./pages/calender";
import Event from "./pages/sideEvent";
import Invoice from "./pages/invoice";
import User from "./pages/user";
import Announcement from "./pages/announcement";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<AppLayout />}>
        <Route path="/delegate" element={<Delegate />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/" element={<Event />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/user" element={<User />} />
        <Route path="/announcement" element={<Announcement />} />
      </Route>
    </Routes>
  );
}

export default App;
