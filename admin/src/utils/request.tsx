import axios from "axios";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";

const client = axios.create({
  baseURL: "https://cop29.onrender.com/api/v1/",
});

// Function to handle navigation
const navigateToLogin = () => {
  // You can replace this with your actual logic for navigation
  window.location.href = "/login";
};

// State to track shown errors
const shownErrors = new Set();

export const request = async (config: any) => {
  try {
    const cookies = new Cookies();
    let access = "";
    if (typeof window !== "undefined") {
      access = cookies.get("accessToken");
    }

    if (access) {
      config.headers = {
        ...config.headers,
        medopt: access ? access : "",
      };
    }

    const response = await client(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { status, data } = error.response || {};

      // Generate a unique key for the error message
      const errorKey = `${status}-${data?.message || "Network Error"}`;

      // Check if the error has been shown already
      if (!shownErrors.has(errorKey)) {
        shownErrors.add(errorKey);

        // Show the error toast
        if (status === 401 || status === 403) {
          toast.error(
            `Client Error: ${status} - ${
              (data as { message?: string })?.message || "Error, try Again"
            }`
          );

          // Redirect to the login route for authentication
          navigateToLogin();
        } else if (status ? status >= 400 && status < 500 : false) {
          toast.error(
            `Client Error: ${status} - ${
              (data as { message?: string })?.message || "Error, try Again"
            }`
          );
        } else if (status ? status >= 500 : false) {
          toast.error(
            `Server Error: ${status} - ${
              (data as { message?: string })?.message || "Error, try Again"
            }`
          );
        }
      }
    } else {
      toast.error("An Error Occurred: Please try again later");
    }

    throw error;
  }
};
