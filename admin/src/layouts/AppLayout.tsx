import { Navigate, Outlet, useLocation } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";
import Layout from "./Layout";
import { Cookies } from "react-cookie";

function AppLayout() {
  const cookies = new Cookies();
  const access = cookies.get("accessToken");
  const location = useLocation();
  return (
    <Layout>
      {access ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </Layout>
  );
}

export default AppLayout;
