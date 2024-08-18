import { toast } from "react-toastify";
import { request } from "../util/api";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

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
    toast.error(`${error?.response?.data?.message || error?.message}`);
    return error
  }
};

export const orgRegister = async (data: any) => {
  try {
    const config = {
      method: "post",
      url: "org/register",
      data,
    };
    const responseData = await request(config);
    if (responseData) {
      toast.success("User Registered!");
    }
    return responseData;
  } catch (error: any) {
    console.error(error);
    toast.error(`${error?.response?.data?.message || error?.message}`);
    return error
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
      toast.success("you are now logged in");
    }
    return responseData;
  } catch (error: any) {
    console.error(error);
    toast.error(`${error?.response?.data?.message || error?.message}`);
    return;
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

export const activate = async () => {
  try {
    const options = {
      method: "PUT",
      url: "/verify",
    };
    const response = await request(options);
    return response;
  } catch (error: any) {
    console.error(error);
    toast.error(`${error?.response?.data?.message || error?.message}`);
    return error
  }
};

export const forgot = async (data: { email: string }) => {
  try {
    const options = {
      method: "POST",
      url: "/forgot-password",
      data,
    };
  
   const response = await request(options);
   if (response) {
    toast.success("Check your email and proceed to reset your password");
  }
  return response;
  } catch (error: any) {
    console.error(error);
    toast.error(`${error?.response?.data?.message || error?.message}`);
    return;
  }
};

export const resendActivation = async (data: { email: string }) => {
  try {
    const options = {
      method: "POST",
      url: "/resend",
      data,
    };
  
   const response = await request(options);
   if (response) {
    toast.success("Check your email and proceed to verify account");
  }
  return response;
  } catch (error: any) {
    console.error(error);
    toast.error(`${error?.response?.data?.message || error?.message}`);
    throw new Error(`Network response was not ok. Status: ${error.response?.status}`);
  }
};

export const reset = async (data: { password: string }) => {
  try {
    const options = {
      method: "POST",
      url: "/reset-password",
      data,
    };
    const response = await request(options);
    if (response) {
      toast.success("Password has been reset!");
    }
    return response;
  } catch (error: any) {
    console.error(error);
    toast.error(`${error?.response?.data?.message || error?.message}`);
  }
  
};
