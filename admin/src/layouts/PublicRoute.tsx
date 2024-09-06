import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const PublicRoute: React.FC = () => {
  const access = cookies.get("accessToken");

  // If the user is authenticated, redirect them to the home page (or any other page)
  if (access) {
    return <Navigate to="/scheduled-meetings" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
