import axios, { AxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";

const cookies = new Cookies();
const client = axios.create({
  baseURL: "https://cop29.onrender.com/api/v1/",
});

// Function to handle navigation
const navigateToLogin = () => {
  cookies.remove("accessToken");
  cookies.remove("profile");
  window.location.href = "/login";
};

// State to track shown errors
const shownErrors = new Set();

export const request = (config: AxiosRequestConfig<any>) => {
  const cookies = new Cookies();
  let access = "";
  if (typeof window !== "undefined") {
    access = cookies.get("accessToken");
  }

  if (access) {
    config.headers = {
      ...config.headers,
      "poc-admin-token": access,
    };
  }

  return client(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      const { status, data } = error.response || {};

      const errorKey = `${status}-${data?.message || "Network Error"}`;

      if (!shownErrors.has(errorKey)) {
        shownErrors.add(errorKey);

        if (status === 401 || status === 403) {
          toast.error("You are not authorised to do this");
          cookies.remove("accessToken");
          cookies.remove("profile");
          navigateToLogin();
        } else if (status && status >= 400 && status < 500) {
          toast.error(data?.message || "Error, try Again");
        } else if (status && status >= 500) {
          toast.error(data?.message || "Server Error, try Again");
        }
      }
      throw error;
    });
};
