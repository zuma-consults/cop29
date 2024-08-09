import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import "react-alice-carousel/lib/alice-carousel.css";
import NewsLetter from "../components/ui/newsLetter";

function AppLayout() {
  return (
    <div className="w-[100vw] text-[12px] h-full overflow-x-hidden">
      <Navbar />
      <div>
        <Outlet />
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default AppLayout;
