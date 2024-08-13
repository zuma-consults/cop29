import { Cookies } from "react-cookie";
import { request } from "../utils/api";

const cookies = new Cookies();

export const login = (data: any) => {
  const config = {
    method: "post",
    url: "login/staff",
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
    method: "get",
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