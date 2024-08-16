import { useQuery, useMutation, QueryClient } from "react-query";
import { login, logout, getProfile, register } from "../../services/auth";
import { Cookies } from "react-cookie";

// Create instances of QueryClient and Cookies
const queryClient = new QueryClient();
const cookies = new Cookies();


// Hook for login
export const useLogin = () => {
  return useMutation(login);
};

// Hook for registration
export const useRegister = () => {
  return useMutation(register, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
  });
};

// Hook for logout
export const useLogout = () => {
  return useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
  });
};

// Hook for getting profile
export const useGetProfile = () => {
  return useQuery("profile", getProfile);
};