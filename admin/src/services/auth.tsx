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
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const registerAdmin = async (data: any) => {
  try {
    const config = {
      method: "post",
      url: "staff",
      data,
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const config = {
      method: "get",
      url: "logout/staff",
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

export const getAllProfile = async () => {
  try {
    const config = {
      method: "get",
      url: "staff",
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getAllRoles = async () => {
  try {
    const config = {
      method: "get",
      url: "roles",
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};
