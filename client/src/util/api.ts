import { toast } from "react-toastify";
import axios, { AxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";

const client = axios.create({
  baseURL: "https://cop29.onrender.com/api/v1",
});
// State to track shown errors
const shownErrors = new Set();

// function navigateToLogin() {
//   // Redirect the user to the login page
//   window.location.href = "/login"; // Change to your login page URL
// }

// Define the function with type annotation
export const request = async (config: AxiosRequestConfig): Promise<any> => {
  const cookies = new Cookies();
  try {
    let access = "";
    if (typeof window !== "undefined") {
      access = cookies.get("accessToken") || "";
    }

    if (access) {
      config.headers = {
        ...config.headers,
        "poc-client-token": access,
      };
    }

    const response = await client(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      const { status, data } = axiosError.response || {};
      // Generate a unique key for the error message
      const errorKey = `${status}-${data?.message || "Network Error"}`;

      // Check if the error has been shown already
      // Check if the error has been shown already
      if (!shownErrors.has(errorKey)) {
        shownErrors.add(errorKey);

        // Check if the current route is NOT the home page
        if (
          window.location.pathname !== "/" &&
          window.location.pathname !== "/negotiator" &&
          !window.location.pathname.startsWith("/verify") &&
          window.location.pathname !== "/signup"
        ) {
          // Show the error toast with user-friendly messages
          if (status === 401 || status === 403) {
            cookies.remove("accessToken");
          }
          if (status && status >= 400 && status < 500) {
            toast.error(
              "There was an issue with your request. Please check the information and try again."
            );
          }
          if (status && status >= 500) {
            toast.error(
              "Oops! Something went wrong on our end. Please try again later."
            );
          }
        }
      }
    } else {
      if (window.location.pathname !== "/") {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }

    throw error;
  }
};
