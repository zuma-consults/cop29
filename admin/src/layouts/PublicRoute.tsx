import React from "react";
import { Cookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

const cookies = new Cookies();

const PublicRoute: React.FC = () => {
  const token = cookies.get("accessToken");
  const profile = cookies.get("profile");

  // If the user is authenticated, redirect them away from the login page
  // if (token && profile) {
  //   return <Navigate to="/" replace />;
  // }

  // If not authenticated, allow access to the login page
  return <Outlet />;
};

export default PublicRoute;
