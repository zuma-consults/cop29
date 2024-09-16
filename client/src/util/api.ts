import { toast } from "react-toastify";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { Cookies } from "react-cookie";

const client = axios.create({
  baseURL: "https://cop29.onrender.com/api/v1/",
});

// State to track shown errors
const shownErrors = new Set<string>();

interface ErrorResponse {
  message?: string;
  error?: string;
}

// Define the function with type annotation
export const request = async (config: AxiosRequestConfig): Promise<any> => {
  try {
    const cookies = new Cookies();
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

    const response: AxiosResponse<any> = await client(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const { status, data } = axiosError.response || {};
      // Generate a unique key for the error message
      const errorKey = `${status}-${data?.message || "Network Error"}`;

      // Check if the error has been shown already
      if (!shownErrors.has(errorKey)) {
        shownErrors.add(errorKey);

        // Show the error toast with user-friendly messages
        if (status === 401 || status === 403) {
          return;
          // toast.error("It seems you're not authorized to perform this action. Please log in and try again.");
          // navigateToLogin();
        }
        if (status && status >= 400 && status < 500) {
          // toast.error("There was an issue with your request. Please check the information and try again.");
        }
        if (status && status >= 500) {
          toast.error(
            "Oops! Something went wrong on our end. Please try again later."
          );
        }
      }
    } else {
      // toast.error("An unexpected error occurred. Please try again later.");
    }

    throw error;
  }
};
