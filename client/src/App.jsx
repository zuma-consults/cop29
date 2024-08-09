import { Route, Routes } from "react-router-dom";
import EventDetails from "./pages/eventDetails";
import Home from "./pages/home";
import AppLayout from "./layouts/AppLayout";
import Events from "./pages/events";
import Login from "./pages/login";
import SignUp from "./pages/signup";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login" element={<SignUp />} />
      <Route path="/" element={<AppLayout />}>
        <Route path="/" index element={<Home />} />
        <Route path="/event" index element={<Events />} />
        <Route path="/event/:id" index element={<EventDetails />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
