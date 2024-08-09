import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

function AppLayout() {
  return (
    <div className="w-full h-[100vh] flex flex-col md:flex-row">
      <Navbar />
      <div
        className={`flex-grow ml-0 md:ml-[20%] mt-[80px] mr-7 h-full mb-[200px] p-1 transition-all duration-300`}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
