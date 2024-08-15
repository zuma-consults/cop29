import { toast } from "react-toastify";
import { request } from "../util/api";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

// Register function
export const register = async (data: any) => {
  try {
    const config = {
      method: "post",
      url: "register",
      data,
    };
    const responseData = await request(config);
    if (responseData) {
      toast.success("User Registered !");
    }
    return responseData;
  } catch (error: any) {
    console.error(error);
    return undefined
  }
};

// Login function
export const login = async (data: any) => {
  try {
    const config = {
      method: "post",
      url: "login",
      data,
    };
    const responseData = await request(config);
    const accessToken = responseData?.data;
    if (accessToken) {
      cookies.set("accessToken", accessToken, { path: "/" });
      toast.success('you are now logged in')
    }
    return responseData;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

// Logout function
export const logout = async () => {
  try {
    const config = {
      method: "post",
      url: "logout",
    };
    const responseData = await request(config);
    if (responseData) {
      cookies.remove("accessToken");
      cookies.remove("profile");
      toast.success("You have been Logged out");
    }
    return responseData;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

// Get profile function
export const getProfile = async () => {
  try {
    const config = {
      method: "get",
      url: "token",
    };
    const responseData = await request(config);
    const profile = responseData?.data;
    if (profile) {
      cookies.set("profile", profile, { path: "/" });
    }
    return responseData;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
