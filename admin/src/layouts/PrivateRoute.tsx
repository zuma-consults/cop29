import React from "react";
import { Cookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

const cookies = new Cookies();

const PrivateRoute: React.FC = () => {
  const token = cookies.get("accessToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
