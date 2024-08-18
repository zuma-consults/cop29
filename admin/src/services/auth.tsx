import { Cookies } from "react-cookie";
import { request } from "../utils/api";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const cookies = new Cookies();

export const login = async (data: any) => {
  const config = {
    method: "post",
    url: `${BASE_URL}/login/staff`, // Use BASE_URL here
    data,
  };

  const response = await axios(config);
  return response.data;
};

export const forgotPassword = async (data: any) => {
  const config = {
    method: "post",
    url: `${BASE_URL}/admin-forgot-password`, // Use BASE_URL here
    data,
  };

  const response = await axios(config);
  return response.data;
};

export const resetPassword = async (data: any) => {
  const config = {
    method: "post",
    url: `${BASE_URL}/admin-reset-password`, // Use BASE_URL here
    data,
  };

  const response = await axios(config);
  return response.data;
};

export const registerAdmin = (data: any) => {
  const config = {
    method: "post",
    url: `${BASE_URL}/staff`, // Use BASE_URL here
    data,
  };

  return request(config)
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logout = () => {
  const config = {
    method: "post",
    url: `${BASE_URL}/logout/staff`, // Use BASE_URL here
  };

  return request(config)
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getProfile = () => {
  const config = {
    method: "get",
    url: `${BASE_URL}/token/staff`, // Use BASE_URL here
  };

  return request(config)
    .then((responseData) => {
      const adminProfile = responseData?.data;
      cookies.set("profile", adminProfile);
      return responseData;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllProfile = () => {
  const config = {
    method: "get",
    url: `${BASE_URL}/staff`, // Use BASE_URL here
  };

  return request(config)
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllRoles = () => {
  const config = {
    method: "get",
    url: `${BASE_URL}/roles`, // Use BASE_URL here
  };

  return request(config)
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => {
      console.log(error);
    });
};
