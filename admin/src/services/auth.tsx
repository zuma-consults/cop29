import { Cookies } from "react-cookie";
import { request } from "../utils/api";
import axios from "axios";

const cookies = new Cookies();

export const login = async (data: any) => {
  const config = {
    method: "post",
    url: "https://cop29.onrender.com/api/v1/login/staff",
    data,
  };

  const response = await axios(config);
  return response.data;
};

export const registerAdmin = (data: any) => {
  const config = {
    method: "post",
    url: "staff",
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
    url: "logout/staff",
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
    url: "token/staff",
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
    url: "staff",
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
    url: "roles",
  };

  return request(config)
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => {
      console.log(error);
    });
};
