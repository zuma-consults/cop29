import { Cookies } from "react-cookie";
import { request } from "../utils/api";

const cookies = new Cookies();

export const login = async (data: any) => {
  try {
    const config = {
      method: "post",
      url: "login/staff",
      data,
    };
    const responseData = await request(config);
    const accessToken = responseData?.token;
    cookies.set("accessToken", accessToken, { path: "/" });
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const config = {
      method: "get",
      url: "authentication/admin/logout",
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async () => {
  try {
    const config = {
      method: "get",
      url: "token/staff",
    };
    const responseData = await request(config);
    const adminProfile = responseData?.data;
    cookies.set("profile", adminProfile);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getAllEvents = async (params?: Record<string, any>) => {
  try {
    const config = {
      method: "get",
      url: "events",
      params, 
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCalender = async (params: Record<string, any>) => {
  try {
    const config = {
      method: "get",
      url: "events",
    
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};