import { Outlet } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";
import Navbar from "../components/ui/Navbar";
// import NewsLetter from "../components/ui/newsLetter";
import Footer from "../components/ui/Footer";

function AppLayout() {
  return (
    <div className="w-[100vw] text-[12px] h-full overflow-x-hidden">
      <Navbar />
      <div>
        <Outlet />
      </div>
      {/* <NewsLetter /> */}
      <Footer />
    </div>
  );
}

export default AppLayout;
