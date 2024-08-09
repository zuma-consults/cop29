import { request } from "../util/api";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const login = async (data) => {
  try {
    const config = {
      method: "post",
      url: "authentication/admin/login",
      data,
    };
    const responseData = await request(config);
    const accessToken = responseData?.token;
    cookies.set("scriipoAccess", accessToken, { path: "/" });
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
      url: "admin",
    };
    const responseData = await request(config);
    const adminProfile = responseData?.data;
    cookies.set("profile", adminProfile, { path: "/" });
    return responseData;
  } catch (error) {
    console.log(error);
  }
};
